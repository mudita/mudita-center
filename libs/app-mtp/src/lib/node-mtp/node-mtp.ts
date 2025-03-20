/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
} from "../app-mtp.interface"

export class NodeMtp implements MtpInterface {
  private progress = 0

  async getDevices(): Promise<MtpDevice[]> {
    return Promise.resolve([{ id: "device-1" }])
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return Promise.resolve([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(data: MtpUploadFileData): Promise<void> {
    console.log("[node-mtp] Start uploading file...")
    await this.processUploadFile(10)
    console.log("[node-mtp] File uploaded successfully.")
    return Promise.resolve()
  }

  async checkProgress(): Promise<number> {
    return Promise.resolve(this.progress)
  }

  private async processUploadFile(intervals: number): Promise<void> {
    const intervalDuration = 500

    const updateProgress = () => {
      const percentage = Math.min(this.progress, 100)
      console.log(`Progress: ${percentage}%`)
    }

    for (let i = 1; i <= intervals; i++) {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          this.progress = Math.round((i / intervals) * 100)
          updateProgress()
          resolve()
        }, i * intervalDuration)
      )
    }
  }
}
