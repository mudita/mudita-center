/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface TransferFile {
  id: string
  name: string
  type: string
  size: number
}

export interface TransferProgressFile extends TransferFile {
  loaded: number
  progress: number
}

export type TransferProgress = {
  // Percentage of file transferred [%]
  progress: number
  // Transferred data size [B]
  loaded: number
  // Total file size [B]
  total: number
  // Information about the current file being transferred
  file?: TransferProgressFile
  // Average speed [B/s]
  rate?: number
  // Estimated time left [s]
  estimated?: number
}

export type TransferProgressHandler = (progress: TransferProgress) => void
