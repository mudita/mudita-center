/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ExecuteTransferParams, TransferFileEntry } from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"

export interface SerialDownloadFilesToMemoryEntry extends TransferFileEntry {
  source: { type: "path"; path: string; fileSize: number }
  target: { type: "memory"; path: string }
}

export interface SerialDownloadFilesToMemoryParams
  extends ExecuteTransferParams<ApiDevice> {
  files: SerialDownloadFilesToMemoryEntry[]
}

export interface SerialDownloadFilesToLocationEntry extends TransferFileEntry {
  source: { type: "path"; path: string; fileSize: number }
  target: { type: "path"; path: string }
}

export interface SerialDownloadFilesToLocationParams
  extends ExecuteTransferParams<ApiDevice> {
  files: SerialDownloadFilesToLocationEntry[]
}

export const isSerialDownloadFilesToMemoryParams = (
  params: ExecuteTransferParams<ApiDevice>
): params is SerialDownloadFilesToMemoryParams => {
  const entry = params.files[0]
  return entry.source.type === "path" && entry.target.type === "memory"
}

export const isSerialDownloadFilesToLocationParams = (
  params: ExecuteTransferParams<ApiDevice>
): params is SerialDownloadFilesToLocationParams => {
  const entry = params.files[0]
  return entry.source.type === "path" && entry.target.type === "path"
}
