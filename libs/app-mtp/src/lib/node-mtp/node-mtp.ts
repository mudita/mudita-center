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
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
  UploadFileResultData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import { isEmpty } from "../utils/is-empty"
import {
  Result,
  ResultObject,
} from "../../../../core/core/builder/result.builder"
import { AppError } from "../../../../core/core/errors/app-error"

export const delay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class NodeMtp implements MtpInterface {
  private uploadFileProgress: Record<string, number> = {}

  constructor(private deviceManager: NodeMtpDeviceManager) {}

  async getDevices(): Promise<MtpDevice[]> {
    return [{ id: "device-1" }]
  }

  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    if (isEmpty(deviceId)) {
      return Result.failed({ type: "MTP_DEVICE_NOT_FOUND" } as AppError)
    }

    return Result.success([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(
    data: MtpUploadFileData
  ): Promise<ResultObject<UploadFileResultData>> {
    if (isEmpty(data.deviceId)) {
      return Result.failed({ type: "MTP_DEVICE_NOT_FOUND" } as AppError)
    }
    const transactionId = generateId()
    void this.processFileUpload(data, transactionId)
    return Result.success({ transactionId })
  }

  async getUploadFileProgress({
    transactionId,
  }: GetUploadFileProgress): Promise<
    ResultObject<GetUploadFileProgressResultData>
  > {
    if (isEmpty(this.uploadFileProgress[transactionId])) {
      return Result.failed({ type: "MTP_TRANSACTION_NOT_FOUND" } as AppError)
    }
    return Result.success({ progress: this.uploadFileProgress[transactionId] })
  }

  private async processFileUpload(
    { sourcePath, destinationPath }: MtpUploadFileData,
    transactionId: string
  ): Promise<void> {
    this.uploadFileProgress[transactionId] = 0

    const PHONE_STORAGE_ID = 65537
    // const SD_CARD_STORAGE_ID = 131073

    const device = this.deviceManager.getDevice()

    const size = await this.getFileSize(sourcePath)
    const name = path.basename(sourcePath)
    const parentObjectHandle = this.getParentObjectHandle(destinationPath)

    const newObjectID = await device.uploadFileInfo({
      size,
      name,
      storageId: PHONE_STORAGE_ID,
      parentObjectHandle,
    })

    if (newObjectID === undefined) {
      throw new Error("Error process file upload")
    }

    const fileStream = fs.createReadStream(sourcePath, { highWaterMark: 1024 })
    let uploadedBytes = 0

    for await (const chunk of fileStream) {
      await delay(200)
      await device.uploadFileData(chunk)

      uploadedBytes += chunk.length
      const progress = (uploadedBytes / size) * 100
      this.uploadFileProgress[transactionId] = progress
      console.log(`[app-mtp/node-mtp] progress: ${progress}%`)
    }
  }

  private async getFileSize(filePath: string): Promise<number> {
    const stats = await fs.promises.stat(filePath)
    return stats.size
  }

  private getParentObjectHandle(filePath: string): number {
    // mock implementation
    return 0
  }
}
