/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetUploadFileProgress,
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
} from "./app-mtp.interface"
import { MtpFactory } from "./app-mtp.factory"

export class AppMtp {
  private mtp: MtpInterface

  constructor() {
    this.mtp = MtpFactory.createInstance()
  }

  async getDevices(): Promise<MtpDevice[]> {
    return this.mtp.getDevices()
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return this.mtp.getDeviceStorages(deviceId)
  }

  async uploadFile(data: MtpUploadFileData): Promise<string> {
    return this.mtp.uploadFile(data)
  }

  async checkProgress(data: GetUploadFileProgress): Promise<number> {
    return this.mtp.getUploadFileProgress(data)
  }
}
