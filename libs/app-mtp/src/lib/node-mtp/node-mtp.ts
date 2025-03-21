/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "node:path"
import fs from "node:fs"
import { delay } from "shared/utils"
import { NodeMtpDeviceManager } from "./node-mtp-device-manager"
import {
  CheckProgressData,
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"


export class NodeMtp implements MtpInterface {
  private uploadFileProgress: Record<string, number> = {}

  constructor(private deviceManager: NodeMtpDeviceManager) {}

  async getDevices(): Promise<MtpDevice[]> {
    return Promise.resolve([{ id: "device-1" }])
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return Promise.resolve([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(data: MtpUploadFileData): Promise<string> {
    const transactionId = generateId()
    void this.processFileUpload(data, transactionId)
    return transactionId
  }

  async checkProgress({ transactionId }: CheckProgressData): Promise<number> {
    return this.uploadFileProgress[transactionId]
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
      console.log(`[app-mtp-server/node-mtp]: ${progress}%`)
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
