/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "node:fs"
import * as path from "node:path"
import { NodeMtpDevice } from "./node-mtp-device"
import { NodeMtpDeviceManager } from "./node-mtp-device-manager"
import { MtpDevice, MtpStorage, MtpUploadFileData, CheckProgressData } from "../app-mtp.interface"

const delay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class NodeMtpAdapter {
  private uploadFileProgress: Record<string, number> = {}

  constructor(private deviceManager: NodeMtpDeviceManager) {}

  async getDevices(): Promise<MtpDevice[]> {
    return Promise.resolve([{ id: "device-1" }])
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return Promise.resolve([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(data: MtpUploadFileData, transactionId: string) {
    this.uploadFileProgress[transactionId] = 0

    const PHONE_STORAGE_ID = 65537
    // const SD_CARD_STORAGE_ID = 131073

    const device = this.deviceManager.getDevice()

    const size = await this.getFileSize(data.sourcePath)
    const name = path.basename(data.sourcePath)
    const parentObjectHandle = this.getParentObjectHandle(data.destinationPath)

    const newObjectID = await device.uploadFileInfo({
      size,
      name,
      storageId: PHONE_STORAGE_ID,
      parentObjectHandle,
    })

    if (newObjectID === undefined) {
      throw new Error("Error process file upload")
    }

    await this.processFileUpload(device, transactionId, size, data.sourcePath)
  }

  async checkProgress({ transactionId }: CheckProgressData): Promise<number> {
    return this.uploadFileProgress[transactionId]
  }

  private async getFileSize(filePath: string): Promise<number> {
    const stats = await fs.promises.stat(filePath)
    return stats.size
  }

  private getParentObjectHandle(filePath: string): number {
    // mock implementation
    return 0
  }

  private async processFileUpload(
    device: NodeMtpDevice,
    transactionId: string,
    size: number,
    sourcePath: string
  ): Promise<void> {
    await device.uploadFileCommand()

    const fileStream = fs.createReadStream(sourcePath, { highWaterMark: 1024 })
    let uploadedBytes = 0

    for await (const chunk of fileStream) {
      await delay(200)
      await device.uploadFileData(chunk)

      uploadedBytes += chunk.length
      const progress = (uploadedBytes / size) * 100
      this.uploadFileProgress[transactionId] = progress
      console.log(`[app-mtp-server/node-mtp-adapter]: ${progress}%`)
    }
  }
}
