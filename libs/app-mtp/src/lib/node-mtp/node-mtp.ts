/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "node:path"
import fs from "node:fs"
import { NodeMtpDeviceManager } from "./node-mtp-device-manager"
import {
  CancelUploadResultData,
  GetUploadFileProgressResultData,
  MtpDevice,
  MTPError,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
  TransactionStatus,
  UploadFileResultData,
  UploadTransactionData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import {
  Result,
  ResultObject,
} from "../../../../core/core/builder/result.builder"
import { AppError } from "../../../../core/core/errors/app-error"
import { handleMtpError, mapToMtpError } from "../utils/handle-mtp-error"
import { StorageType } from "./utils/parse-storage-info"
import { mtpUploadChunkSize, rootObjectHandle } from "./mtp-packet-definitions"
import { ResponseObjectInfo } from "./utils/object-info.interface"
import { getObjectFormat, isObjectCatalog } from "./utils/object-format.helpers"
import { ObjectFormatCode } from "./utils/object-format.interface"

const PREFIX_LOG = `[app-mtp/node-mtp]`

export class NodeMtp implements MtpInterface {
  private uploadFileTransactionStatus: Record<string, TransactionStatus> = {}
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
    data: MtpUploadFileData
  ): Promise<ResultObject<UploadFileResultData>> {
    const result = await this.processUploadFileInfo(data)

    if (!result.ok) {
      return result
    }

    const transactionId = generateId()
    void this.processUploadFile(data, transactionId)
    return Result.success({ transactionId })
  }

  async getUploadFileProgress({
    transactionId,
  }: UploadTransactionData): Promise<
    ResultObject<GetUploadFileProgressResultData>
  > {
    if (this.uploadFileTransactionStatus[transactionId] === undefined) {
      return Result.failed(new AppError(MTPError.MTP_TRANSACTION_NOT_FOUND))
    }

    if (this.uploadFileTransactionStatus[transactionId].error) {
      return Result.failed(
        this.uploadFileTransactionStatus[transactionId].error as AppError
      )
    }

    return Result.success({
      progress: this.uploadFileTransactionStatus[transactionId].progress,
    })
  }

  async cancelUpload(
    data: UploadTransactionData
  ): Promise<ResultObject<CancelUploadResultData>> {
    const transactionStatus =
      this.uploadFileTransactionStatus[data.transactionId]

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
    filePath: string,
    parentObjectHandle: number
  ): Promise<number> {
    const pathSegments = filePath.split("/").filter((segment) => segment !== "")
    if (pathSegments.length === 0) {
      return parentObjectHandle
    } else {
      const truncatedPath = pathSegments.slice(1).join("/")
      const objectHandle = await this.createFolder(
        deviceId,
        storageId,
        pathSegments[0],
        parentObjectHandle
      )
      return this.createDirectories(
        deviceId,
        storageId,
        truncatedPath,
        objectHandle
      )
    }
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
  }: MtpUploadFileData): Promise<ResultObject<number>> {
    try {
      if (!fs.existsSync(sourcePath)) {
        return Result.failed(
          new AppError(
            MTPError.MTP_SOURCE_PATH_NOT_FOUND,
            "`sourcePath` not found. Please check the provided path in the request."
          )
        )
      }

      const storageIdNumber = Number(storageId)

      const size = await this.getFileSize(sourcePath)
      const name = path.basename(sourcePath)
      const parentObjectHandle = await this.getObjectHandleFromLastPathSegment(
        deviceId,
        storageIdNumber,
        destinationPath
      )

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
    { sourcePath, deviceId }: MtpUploadFileData,
    transactionId: string
  ): Promise<void> {
    try {
      this.abortController = new AbortController()
      const startTime = Date.now()
      this.uploadFileTransactionStatus[transactionId] = {
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
          this.uploadFileTransactionStatus[transactionId].error = new AppError(
            MTPError.MTP_PROCESS_CANCELLED,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `Error uploading file in progress: ${this.uploadFileTransactionStatus[transactionId].progress}% - ${MTPError.MTP_PROCESS_CANCELLED}`
          )
          return
        }
        await device.uploadFileData(chunk)
        uploadedBytes += chunk.length
        const progress = (uploadedBytes / size) * 100
        this.uploadFileTransactionStatus[transactionId].progress = progress
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
      this.uploadFileTransactionStatus[transactionId].error =
        mtpError.type === MTPError.MTP_INITIALIZE_ACCESS_ERROR
          ? mtpError
          : new AppError(
              MTPError.MTP_GENERAL_ERROR,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `Error uploading file in progress: ${this.uploadFileTransactionStatus[transactionId].progress}% - ${error}`
            )
    }
  }

  private async getFileSize(filePath: string): Promise<number> {
    const stats = await fs.promises.stat(filePath)
    return stats.size
  }

  private async getObjectHandleFromLastPathSegment(
    deviceId: string,
    storageId: number,
    filePath: string,
    objectHandle: number = rootObjectHandle
  ): Promise<number> {
    console.log(
      `${PREFIX_LOG} getObjectHandleFromLastPathSegment... filePath: ${filePath}, objectHandle: ${objectHandle}`
    )

    const pathSegments = filePath.split("/").filter((segment) => segment !== "")

    if (pathSegments.length === 0) {
      return objectHandle
    } else {
      const truncatedPath = pathSegments.slice(1).join("/")

      const childObjectInfoList = await this.getChildObjectInfoList(
        objectHandle,
        deviceId,
        storageId
      )

      const childObjectInfo = childObjectInfoList.find(
        (objectInfo) =>
          objectInfo.filename === pathSegments[0] && isObjectCatalog(objectInfo)
      )

      if (childObjectInfo) {
        return this.getObjectHandleFromLastPathSegment(
          deviceId,
          storageId,
          truncatedPath,
          childObjectInfo.objectHandle
        )
      } else {
        return this.createDirectories(
          deviceId,
          storageId,
          filePath,
          objectHandle
        )
      }
    }
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

      if(mtpError.type !== MTPError.MTP_GENERAL_ERROR) {
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
