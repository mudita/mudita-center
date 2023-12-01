/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TransferProgress } from "App/__deprecated__/renderer/utils/transfer-progress"

export enum DownloadStatus {
  Progressing = "progressing",
  Interrupted = "interrupted",
  Completed = "completed",
  Cancelled = "cancelled",
  Paused = "paused",
}

export interface DownloadChannel {
  start: string
  progress: string
  cancel: string
  done: string
}

export interface DownloadProgress extends TransferProgress {
  status: Omit<
    DownloadStatus,
    DownloadStatus.Cancelled | DownloadStatus.Completed
  >
}

export type DownloadFinishedStatus = Exclude<
  DownloadStatus,
  DownloadStatus.Progressing | DownloadStatus.Paused
>

export interface DownloadFinished {
  status: DownloadFinishedStatus
  directory: string
  totalBytes: number
}

export interface DownloadListener {
  url: string
  fileName: string
  savePath: string
  channels: DownloadChannel
}

export type Filename = string

export type Filesize = number
