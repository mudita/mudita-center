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
  MTP_SOURCE_PATH_NOT_FOUND = "MTP_SOURCE_PATH_NOT_FOUND",
  MTP_TRANSACTION_NOT_FOUND = "MTP_TRANSACTION_NOT_FOUND",
  MTP_READ_TIMEOUT = "MTP_READ_TIMEOUT",
  MTP_READ_FAILURE = "MTP_READ_FAILURE",
  MTP_WRITE_TIMEOUT = "MTP_WRITE_TIMEOUT",
  MTP_GENERAL_ERROR = "MTP_GENERAL_ERROR",
  MTP_PROCESS_CANCELLED = "MTP_PROCESS_CANCELLED",
  MTP_INITIALIZE_ACCESS_ERROR = "MTP_INITIALIZE_ACCESS_ERROR",
  MTP_FILE_EXISTS_ERROR = "MTP_FILE_EXISTS_ERROR",
  MTP_NOT_ENOUGH_SPACE = "MTP_NOT_ENOUGH_SPACE",
  MTP_CANCEL_FAILED_ALREADY_TRANSFERRED = "MTP_CANCEL_FAILED_ALREADY_TRANSFERRED",
}

export interface MtpTransferFileData {
  deviceId: string // on Mac and Linux: Kompakt serial number; on Windows: PID
  storageId: string
  destinationPath: string
  sourcePath: string
}

export interface TransferFileResultData {
  transactionId: string
}

export interface TransferTransactionData {
  transactionId: string
}

export interface GetTransferFileProgressResultData {
  progress: number
}

export interface TransferUploadFileResultData {}

export interface CancelTransferResultData {}

export interface MtpInterface {
  getDevices(): Promise<MtpDevice[]>

  getDeviceStorages(deviceId: string): Promise<ResultObject<MtpStorage[]>>

  uploadFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>>

  exportFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>>

  getUploadFileProgress(
    data: TransferTransactionData
  ): Promise<ResultObject<GetTransferFileProgressResultData>>

  cancelUpload(
    data: TransferTransactionData
  ): Promise<ResultObject<CancelTransferResultData>>
}
