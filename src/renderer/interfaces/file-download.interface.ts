export enum DownloadStatus {
  Progressing = "progressing",
  Interrupted = "interrupted",
  Completed = "completed",
  Cancelled = "cancelled",
  Paused = "paused",
}

export interface DownloadProgress {
  status: Omit<
    DownloadStatus,
    DownloadStatus.Cancelled | DownloadStatus.Completed
  >
  total: number
  received: number
  percent: number
  timeLeft: number
  speed: number
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
