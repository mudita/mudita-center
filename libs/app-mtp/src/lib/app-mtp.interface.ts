/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface MtpDevice {
  id?: string
}

export interface MtpStorage {
  id: string
}

export interface MtpUploadFileData {
  deviceId: string
  storageId: string
  destinationPath: string
  sourcePath: string
}

export interface GetUploadFileProgress {
  transactionId: string
}

export interface MtpInterface {
  getDevices(): Promise<MtpDevice[]>

  getDeviceStorages(deviceId: string): Promise<MtpStorage[]>

  uploadFile(data: MtpUploadFileData): Promise<string>

  getUploadFileProgress(data: GetUploadFileProgress): Promise<number>
}
