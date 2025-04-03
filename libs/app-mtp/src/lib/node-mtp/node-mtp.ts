/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "node:path"
import fs from "node:fs"
import { NodeMtpDeviceManager } from "./node-mtp-device-manager"
import {
  GetUploadFileProgress,
  GetUploadFileProgressResultData,
  MtpDevice,
  MTPError,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
  TransactionStatus,
  UploadFileResultData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import {
  Result,
  ResultObject,
} from "../../../../core/core/builder/result.builder"
import { AppError } from "../../../../core/core/errors/app-error"
import { handleMtpError } from "../utils/handle-mtp-error"

const PREFIX_LOG = `[app-mtp/node-mtp]`

export class NodeMtp implements MtpInterface {
  private uploadFileTransactionStatus: Record<string, TransactionStatus> = {}

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

      console.log(`${PREFIX_LOG} getting device storages storageIds: ${JSON.stringify(storageIds)}`)

      return Result.success([
        { id: "storage-1", name: "Storage 1" },
        { id: "storage-2", name: "Storage 2" },
      ])
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
  }: GetUploadFileProgress): Promise<
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

  private async processUploadFileInfo({
    sourcePath,
    destinationPath,
    deviceId,
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

      const PHONE_STORAGE_ID = 65537
      // const SD_CARD_STORAGE_ID = 131073

      const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
      const size = await this.getFileSize(sourcePath)
      const name = path.basename(sourcePath)
      const parentObjectHandle = await this.getParentObjectHandle(
        destinationPath,
        deviceId
      )

      const newObjectID = await device.uploadFileInfo({
        size,
        name,
        storageId: PHONE_STORAGE_ID,
        parentObjectHandle,
      })

      console.log(
        `${PREFIX_LOG} process upload file info newObjectID: ${newObjectID}`
      )

      if (newObjectID === undefined) {
        console.log(
          `${PREFIX_LOG} process upload file info error - newObjectID is undefined`
        )
        return Result.failed(new AppError(MTPError.MTP_GENERAL_ERROR))
      }

      return Result.success(newObjectID)
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
      const startTime = Date.now()
      this.uploadFileTransactionStatus[transactionId] = {
        progress: 0,
      }

      const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
      const size = await this.getFileSize(sourcePath)

      await device.initiateUploadFile(size)

      let uploadedBytes = 0
      const fileStream = fs.createReadStream(sourcePath, {
        highWaterMark: 1024,
      })

      for await (const chunk of fileStream) {
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
      this.uploadFileTransactionStatus[transactionId].error = new AppError(
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

  private async getParentObjectHandle(
    filePath: string,
    deviceId: string
  ): Promise<number> {
    // getObjectHandles request is obligatory to allows correctly start the upload process - temporary solution
    const device = await this.deviceManager.getNodeMtpDevice({ id: deviceId })
    await device.getObjectHandles()

    // mock implementation, `7` is the Picture folder
    return 7
  }
}
