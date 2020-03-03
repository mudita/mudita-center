import { TransferProgress } from "Renderer/utils/transfer-progress"

export enum DownloadStatus {
  Progressing = "progressing",
  Interrupted = "interrupted",
  Completed = "completed",
  Cancelled = "cancelled",
  Paused = "paused",
}

export interface DownloadProgress extends TransferProgress {
  status: Omit<
    DownloadStatus,
    DownloadStatus.Cancelled | DownloadStatus.Completed
  >
}

export interface DownloadFinished {
  status: Omit<
    DownloadStatus,
    DownloadStatus.Progressing | DownloadStatus.Paused
  >
  directory: string
  totalBytes: number
}

export interface DownloadListener {
  url: string
  path: string
  channels: {
    Start: string
    Progress: string
    Cancel: string
    Done: string
  }
}

export type Filename = string
