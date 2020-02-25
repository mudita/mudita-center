import { ipcRenderer } from "electron-better-ipc"

export enum DownloadStatus {
  Progressing = "progressing",
  Interrupted = "interrupted",
  Completed = "completed",
  Cancelled = "cancelled",
  Paused = "paused",
}

export type UpdateRequestFile = string

export interface OSDownloadProgressing {
  status: Omit<
    DownloadStatus,
    DownloadStatus.Cancelled | DownloadStatus.Completed
  >
  data: {
    total: number
    received: number
    percent: number
    timeLeft: number
  }
}

export interface OSDownloadFinished {
  status: Omit<DownloadStatus, DownloadStatus.Progressing>
  directory: string
  totalBytes: number
}

const downloadOsUpdateRequest = (
  file: UpdateRequestFile
): Promise<OSDownloadFinished> => {
  return new Promise((resolve, reject) => {
    try {
      ipcRenderer.send("download", {
        url: `https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/${file}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200221/eu-central-1/s3/aws4_request&X-Amz-Date=20200221T153012Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=82579e455cd4f9c740423073e072c74c8403274ce0c16c93c4903cd8fb029348`,
      })
      ipcRenderer.on("download-finished", (event, args: OSDownloadFinished) => {
        args.status === DownloadStatus.Completed ? resolve(args) : reject(args)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default downloadOsUpdateRequest
