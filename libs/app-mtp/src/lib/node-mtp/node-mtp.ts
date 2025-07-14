/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "node:path"
import fs from "node:fs"
import { NodeMtpDeviceManager } from "./node-mtp-device-manager"
import {
  CancelTransferResultData,
  GetTransferFileProgressResultData,
  MtpDevice,
  MTPError,
  MtpInterface,
  MtpStorage,
  MtpTransferFileData,
  TransactionStatus,
  TransferFileResultData,
  TransferTransactionData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import {
  Result,
  ResultObject,
} from "../../../../core/core/builder/result.builder"
import { AppError } from "../../../../core/core/errors/app-error"
import { handleMtpError, mapToMtpError } from "../utils/handle-mtp-error"
import { StorageType } from "./utils/parse-storage-info"
import { mtpUploadChunkSize } from "./mtp-packet-definitions"
import { ResponseObjectInfo } from "./utils/object-info.interface"
import { getObjectFormat, isObjectCatalog } from "./utils/object-format.helpers"
import { ObjectFormatCode } from "./utils/object-format.interface"

const PREFIX_LOG = `[app-mtp/node-mtp]`

export class NodeMtp implements MtpInterface {
  private transferFileTransactionStatus: Record<string, TransactionStatus> = {}
  private abortController: AbortController | undefined

  constructor(private deviceManager: NodeMtpDeviceManager) {}

  async getDevices(): Promise<MtpDevice[]> {
    return this.deviceManager.getDevices()
  }

  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    try {
      const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
      const storageIds = await device.getStorageIds()

      const storages: MtpStorage[] = []

      for await (const storageId of storageIds) {
        const storageInfo = await device.getStorageInfo(storageId)
        const storage: MtpStorage = {
          id: String(storageId),
          name: storageInfo.storageDescription,
        }
        if (
          storageInfo.storageType === StorageType.FixedRAM ||
          storageInfo.storageType === StorageType.RemovableRAM
        ) {
          storage["isInternal"] =
            storageInfo.storageType === StorageType.FixedRAM
        }
        storages.push(storage)
      }

      return Result.success(storages)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`${PREFIX_LOG} getting device storages error: ${error}`)
      return handleMtpError(error)
    }
  }

  async uploadFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>> {
    const result = await this.processUploadFileInfo(data)

    if (!result.ok) {
      return result
    }

    const transactionId = generateId()
    void this.processUploadFile(data, transactionId)
    return Result.success({ transactionId })
  }

  async exportFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>> {
    const transactionId = generateId()

    void this.processExportFile(data, transactionId)

    return Result.success({ transactionId })
  }

  async getTransferredFileProgress({
    transactionId,
  }: TransferTransactionData): Promise<
    ResultObject<GetTransferFileProgressResultData>
  > {
    if (this.transferFileTransactionStatus[transactionId] === undefined) {
      return Result.failed(new AppError(MTPError.MTP_TRANSACTION_NOT_FOUND))
    }

    if (this.transferFileTransactionStatus[transactionId].error) {
      return Result.failed(
        this.transferFileTransactionStatus[transactionId].error as AppError
      )
    }

    return Result.success({
      progress: this.transferFileTransactionStatus[transactionId].progress,
    })
  }

  async cancelFileTransfer(
    data: TransferTransactionData
  ): Promise<ResultObject<CancelTransferResultData>> {
    const transactionStatus =
      this.transferFileTransactionStatus[data.transactionId]

    if (transactionStatus === undefined) {
      return Result.failed({
        type: MTPError.MTP_TRANSACTION_NOT_FOUND,
      } as AppError)
    } else if (transactionStatus.progress === 100) {
      return Result.failed({
        type: MTPError.MTP_CANCEL_FAILED_ALREADY_TRANSFERRED,
      } as AppError)
    } else {
      this.abortController?.abort()
      console.log(
        `${PREFIX_LOG} Canceling upload for transactionId ${data.transactionId}, signal abort status: ${this.abortController?.signal.aborted}`
      )
      return Result.success({})
    }
  }

  private async createDirectories(
    deviceId: string,
    storageId: number,
    filePath: string
  ): Promise<number> {
    const rootObjectHandle = 0xffffffff
    const pathSegments = filePath.split("/").filter(Boolean)

    let currentParent = rootObjectHandle

    for (const segment of pathSegments) {
      const children = await this.getChildObjectInfoList(
        currentParent,
        deviceId,
        storageId
      )

      const existingFolder = children.find(
        (child) => child.filename === segment
      )

      if (existingFolder && isObjectCatalog(existingFolder)) {
        currentParent = existingFolder.objectHandle
      } else {
        const newFolderHandle = await this.createFolder(
          deviceId,
          storageId,
          segment,
          currentParent
        )
        currentParent = newFolderHandle
      }
    }
    return currentParent
  }

  private async createFolder(
    deviceId: string,
    storageId: number,
    name: string,
    parentObjectHandle: number
  ): Promise<number> {
    console.log(
      `${PREFIX_LOG} createFolder... deviceId: ${deviceId}, storageId: ${storageId}, name: ${name}, parentObjectHandle: ${parentObjectHandle}`
    )

    const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })

    return device.uploadFileInfo({
      size: 0,
      name,
      storageId,
      parentObjectHandle,
      objectFormat: ObjectFormatCode.Association,
    })
  }

  private async processUploadFileInfo({
    sourcePath,
    destinationPath,
    deviceId,
    storageId,
  }: MtpTransferFileData): Promise<ResultObject<number>> {
    try {
      if (!fs.existsSync(sourcePath)) {
        return Result.failed(
          new AppError(
            MTPError.MTP_SOURCE_PATH_NOT_FOUND,
            "`sourcePath` not found. Please check the provided path in the request."
          )
        )
      }

      const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
      const storageIdNumber = Number(storageId)

      const size = await this.getFileSize(sourcePath)
      const name = path.basename(sourcePath)
      let parentObjectHandle = await device.findObjectHandleFromPath(
        storageIdNumber,
        destinationPath
      )

      console.log(parentObjectHandle)
      if (parentObjectHandle === undefined) {
        parentObjectHandle = await this.createDirectories(
          deviceId,
          storageIdNumber,
          destinationPath
        )
      }

      const objectFormat = getObjectFormat(name)

      return this.uploadFileInfo(
        deviceId,
        storageIdNumber,
        size,
        name,
        objectFormat,
        parentObjectHandle
      )
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`${PREFIX_LOG} process upload file info error: ${error}`)
      return handleMtpError(error)
    }
  }

  private async processUploadFile(
    { sourcePath, deviceId }: MtpTransferFileData,
    transactionId: string
  ): Promise<void> {
    try {
      this.abortController = new AbortController()
      const startTime = Date.now()
      this.transferFileTransactionStatus[transactionId] = {
        progress: 0,
      }
      const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
      const size = await this.getFileSize(sourcePath)
      await device.initiateUploadFile(size)
      let uploadedBytes = 0
      const fileStream = fs.createReadStream(sourcePath, {
        highWaterMark: mtpUploadChunkSize,
      })

      for await (const chunk of fileStream) {
        if (this.abortController.signal.aborted) {
          await device.cancelTransaction()
          this.transferFileTransactionStatus[transactionId].error =
            new AppError(
              MTPError.MTP_PROCESS_CANCELLED,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `Error uploading file in progress: ${this.transferFileTransactionStatus[transactionId].progress}% - ${MTPError.MTP_PROCESS_CANCELLED}`
            )
          return
        }
        await device.uploadFileData(chunk)
        uploadedBytes += chunk.length
        const progress = (uploadedBytes / size) * 100
        this.transferFileTransactionStatus[transactionId].progress = progress
        console.log(`${PREFIX_LOG} progress: ${progress}%`)
      }

      const endTime = Date.now()
      const durationInSeconds = (endTime - startTime) / 1000
      const speedInMBps = size / 1024 / 1024 / durationInSeconds

      console.log(
        `${PREFIX_LOG} File upload completed in ${durationInSeconds.toFixed(
          2
        )} seconds.`
      )
      console.log(`${PREFIX_LOG} Upload speed: ${speedInMBps.toFixed(2)} MB/s`)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`${PREFIX_LOG} process upload file error: ${error}`)

      const mtpError = mapToMtpError(error)
      this.transferFileTransactionStatus[transactionId].error =
        mtpError.type === MTPError.MTP_INITIALIZE_ACCESS_ERROR
          ? mtpError
          : new AppError(
              MTPError.MTP_GENERAL_ERROR,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `Error uploading file at progress: ${this.transferFileTransactionStatus[transactionId].progress}% - ${error}`
            )
    }
  }

  private async processExportFile(
    { sourcePath, deviceId, storageId, destinationPath }: MtpTransferFileData,
    transactionId: string
  ): Promise<void> {
    try {
      this.abortController = new AbortController()
      const startTime = Date.now()
      this.transferFileTransactionStatus[transactionId] = { progress: 0 }

      const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
      const { objectHandle, fileName, fileSize } =
        await device.initiateExportFile(sourcePath, parseInt(storageId))

      const outputPath = path.join(destinationPath, fileName)
      const writeStream = fs.createWriteStream(outputPath)

      let offset = 0
      let downloadedBytes = 0

      while (offset < fileSize) {
        if (this.abortController.signal.aborted) {
          writeStream.close()
          fs.rmSync(outputPath)
          this.transferFileTransactionStatus[transactionId].error =
            new AppError(
              MTPError.MTP_PROCESS_CANCELLED,
              `Export aborted at ${this.transferFileTransactionStatus[
                transactionId
              ].progress.toFixed(2)}%`
            )
          return
        }

        const chunkSize = Math.min(mtpUploadChunkSize, fileSize - offset)
        const chunk = await device.exportFileData(
          objectHandle,
          offset,
          chunkSize
        )

        writeStream.write(chunk)
        downloadedBytes += chunk.length
        offset += chunk.length

        const progress = (downloadedBytes / fileSize) * 100
        this.transferFileTransactionStatus[transactionId].progress = progress
        console.log(`${PREFIX_LOG} export progress: ${progress.toFixed(2)}%`)
      }

      writeStream.close()
      const duration = (Date.now() - startTime) / 1000
      const speed = fileSize / 1024 / 1024 / duration

      console.log(
        `${PREFIX_LOG} File export completed in ${duration.toFixed(2)} seconds.`
      )
      console.log(`${PREFIX_LOG} Export speed: ${speed.toFixed(2)} MB/s`)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`${PREFIX_LOG} export file error: ${error}`)
      const mtpError = mapToMtpError(error)
      this.transferFileTransactionStatus[transactionId].error =
        mtpError.type === MTPError.MTP_INITIALIZE_ACCESS_ERROR
          ? mtpError
          : new AppError(
              MTPError.MTP_GENERAL_ERROR,
              `Error during exporting file at progress ${
                this.transferFileTransactionStatus[
                  transactionId
                ]?.progress?.toFixed(2) ?? 0
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              }%: ${error}`
            )
    }
  }

  private async getFileSize(filePath: string): Promise<number> {
    const stats = await fs.promises.stat(filePath)
    return stats.size
  }

  private async getChildObjectInfoList(
    parentHandle: number,
    deviceId: string,
    storageId: number
  ): Promise<ResponseObjectInfo[]> {
    const objectInfoList: ResponseObjectInfo[] = []
    const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
    const objectHandles = await device.getObjectHandles(parentHandle, storageId)

    for await (const objectHandle of objectHandles) {
      const objectInfo = await device.getObjectInfo(objectHandle)
      objectInfoList.push(objectInfo)
    }

    return objectInfoList
  }

  private async uploadFileInfo(
    deviceId: string,
    storageId: number,
    size: number,
    name: string,
    objectFormat: ObjectFormatCode,
    parentObjectHandle: number
  ): Promise<ResultObject<number>> {
    const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })

    try {
      const newObjectID = await device.uploadFileInfo({
        size,
        name,
        storageId,
        parentObjectHandle,
        objectFormat,
      })

      if (newObjectID === undefined) {
        console.log(
          `${PREFIX_LOG} process upload file info error - newObjectID is undefined`
        )
      }

      return Result.success(newObjectID)
    } catch (error) {
      const mtpError = mapToMtpError(error)

      if (mtpError.type !== MTPError.MTP_GENERAL_ERROR) {
        return Result.failed(mtpError)
      }

      const childObjectInfoList = await this.getChildObjectInfoList(
        parentObjectHandle,
        deviceId,
        storageId
      )
      const filenameDuplicated = childObjectInfoList.some(
        ({ filename }) => filename === name
      )
      if (filenameDuplicated) {
        console.log(
          `${PREFIX_LOG} File ${name} already exists in the destination path.`
        )
        return Result.failed(
          new AppError(
            MTPError.MTP_FILE_EXISTS_ERROR,
            `File ${name} already exists in the destination path.`
          )
        )
      }

      return Result.failed(mtpError)
    }
  }
}
