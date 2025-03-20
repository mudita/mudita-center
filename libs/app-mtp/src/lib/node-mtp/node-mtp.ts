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

const generateId = (): string => {
  const timestamp = Date.now()
  const randomPart = Math.random().toString(36).slice(2, 11)
  return `${timestamp}${randomPart}`
}

export class NodeMtp implements MtpInterface {
  private nodeMtpAdapter = new NodeMtpAdapter(new NodeMtpDeviceManager())

  async getDevices(): Promise<MtpDevice[]> {
    return this.nodeMtpAdapter.getDevices()
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return this.nodeMtpAdapter.getDeviceStorages(deviceId)
  }

  async uploadFile(data: MtpUploadFileData): Promise<string> {
    const transactionId = generateId()
    void this.nodeMtpAdapter.uploadFile(data, transactionId)
    return Promise.resolve(transactionId)
  }

  async checkProgress(data: CheckProgressData): Promise<number> {
    return this.nodeMtpAdapter.checkProgress(data)
  }
}
