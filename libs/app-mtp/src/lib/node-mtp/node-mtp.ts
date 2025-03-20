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
import { NodeMtpDeviceManager } from "./node-mtp-device-manager"
import { NodeMtpAdapter } from "./node-mtp.adapter"
import { generateId } from "../utils/generate-id"

export class NodeMtp implements MtpInterface {
  private mtpAdapter = new NodeMtpAdapter(new NodeMtpDeviceManager())

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
