/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "../../../core/core/builder/result.builder"
import { AppError } from "../../../core/core/errors/app-error"

export interface MtpDevice {
  id: string
  name: string
}

export interface MtpStorage {
  id: string
  name: string
  isInternal?: boolean
}

export interface TransactionStatus {
  progress: number
  error?: AppError
}

export enum MTPError {
  MTP_DEVICE_NOT_FOUND = "MTP_DEVICE_NOT_FOUND",
  MTP_STORAGE_NOT_FOUND = "MTP_STORAGE_NOT_FOUND",
  MTP_OBJECT_HANDLE_NOT_FOUND = "MTP_OBJECT_HANDLE_NOT_FOUND",
  MTP_SOURCE_PATH_NOT_FOUND = "MTP_SOURCE_PATH_NOT_FOUND",
  MTP_TRANSACTION_NOT_FOUND = "MTP_TRANSACTION_NOT_FOUND",
  MTP_READ_TIMEOUT = "MTP_READ_TIMEOUT",
  MTP_READ_FAILURE = "MTP_READ_FAILURE",
  MTP_WRITE_TIMEOUT = "MTP_WRITE_TIMEOUT",
  MTP_GENERAL_ERROR = "MTP_GENERAL_ERROR",
}

export interface MtpUploadFileData {
  deviceId: string // on Mac and Linux: Kompakt serial number; on Windows: PID
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
