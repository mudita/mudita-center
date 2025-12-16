/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppFailedResult,
  AppFileSystemGuardOptions,
  AppResult,
  TransferProgressHandler,
} from "app-utils/models"
import { ApiDevice } from "devices/api-device/models"
import { Harmony } from "devices/harmony/models"

export enum TransferMode {
  Serial = "serial",
  Mtp = "mtp",
}

export enum FailedTransferErrorName {
  Duplicate = "duplicate",
  NotEnoughMemory = "notEnoughMemory",
  FileTooLarge = "fileTooLarge",
  Aborted = "aborted",
  Unknown = "unknown",
}

export interface FailedTransferItem {
  id: string
  errorName: FailedTransferErrorName | string
  values?: Record<string, string | number> | unknown
}

export type ExecuteTransferParams<DeviceType> = Omit<
  TransferFilesParams<DeviceType>,
  "action"
>

export type ExecuteTransferSuccessData =
  | {
      failed?: FailedTransferItem[]
    }
  | {
      files: (string | Uint8Array)[]
      failed?: FailedTransferItem[]
    }

export const isExecuteTransferSuccessDataWithFiles = (
  data: ExecuteTransferSuccessData
): data is { files: (string | Buffer)[]; failed?: FailedTransferItem[] } => {
  return (data as { files: (string | Buffer)[] }).files !== undefined
}

export type ExecuteTransferAppFailedResult = AppFailedResult<
  FailedTransferErrorName | string,
  { failed: FailedTransferItem[] }
>

export type ExecuteTransferResult = AppResult<
  ExecuteTransferSuccessData,
  FailedTransferErrorName | string,
  { failed: FailedTransferItem[] }
>

export type ExecuteTransferFn<DeviceType> = (
  params: ExecuteTransferParams<DeviceType>
) => Promise<ExecuteTransferResult>

export enum TransferFilesActionType {
  Upload = "Upload",
  Download = "Download",
}

export type DataSource =
  | { type: "memory"; data: (string | Uint8Array) }
  | { type: "path"; path: string; fileSize?: number }
  | { type: "fileLocation"; fileLocation: AppFileSystemGuardOptions }

export type DataTarget = { type: "memory" } | { type: "path"; path: string }

export interface TransferFileFromPathEntry extends TransferFileEntry {
  source: { type: "fileLocation"; fileLocation: AppFileSystemGuardOptions }
  target: { type: "path"; path: string }
}

export interface TransferFileEntry {
  id: string
  source: DataSource
  target: DataTarget
}

export interface TransferFilesParams<DeviceType = ApiDevice | Harmony> {
  device: DeviceType
  action: TransferFilesActionType
  files: TransferFileEntry[]

  transferMode?: TransferMode
  autoSwitchMTPMax?: number

  onModeChange?: (mode: TransferMode) => void
  onProgress?: TransferProgressHandler

  abortController: AbortController

  entityType?: string
}

export type TransferFilesTypes = `${TransferMode}:${TransferFilesActionType}`
