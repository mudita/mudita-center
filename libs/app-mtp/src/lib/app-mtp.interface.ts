/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "../../../core/core/builder/result.builder"

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

export interface UploadFileResultData {
  transactionId: string
}

export interface GetUploadFileProgress {
  transactionId: string
}

export interface GetUploadFileProgressResultData {
  progress: number
}

export interface MtpInterface {
  getDevices(): Promise<MtpDevice[]>

  getDeviceStorages(deviceId: string): Promise<ResultObject<MtpStorage[]>>

  uploadFile(
    data: MtpUploadFileData
  ): Promise<ResultObject<UploadFileResultData>>

  getUploadFileProgress(
    data: GetUploadFileProgress
  ): Promise<ResultObject<GetUploadFileProgressResultData>>
}
