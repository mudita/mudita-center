/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CheckProgressData,
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
} from "../app-mtp.interface"
import { DotnetMtpAdapter } from "./dotnet-mtp-adapter"
import { generateId } from "../utils/generate-id"

export class DotnetMtp implements MtpInterface {
  private mtpAdapter = new DotnetMtpAdapter()

  async getDevices(): Promise<MtpDevice[]> {
    return this.mtpAdapter.getDevices()
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return this.mtpAdapter.getDeviceStorages(deviceId)
  }

  async uploadFile(data: MtpUploadFileData): Promise<string> {
    const transactionId = generateId()
    void this.mtpAdapter.uploadFile(data, transactionId)
    return Promise.resolve(transactionId)
  }

  async checkProgress(data: CheckProgressData): Promise<number> {
    return this.mtpAdapter.checkProgress(data)
  }
}
