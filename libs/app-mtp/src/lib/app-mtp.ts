/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface MtpDevice {
  id?: string
}

interface MtpStorage {
  id: string
}

export interface MtpUploadFileData {
  deviceId: string
  storageId: string
  destinationPath: string
  sourcePath: string
}

export class AppMtp {
  constructor() {}

  async getDevices(): Promise<MtpDevice[]> {
    return Promise.resolve([{ id: "device-1" }])
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return Promise.resolve([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(data: MtpUploadFileData): Promise<void> {
    return Promise.resolve()
  }
}
