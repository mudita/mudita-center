import { BrowserWindow, DownloadItem } from "electron"
import { ipcMain } from "electron-better-ipc"

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

const registerDownloadListener = (win: BrowserWindow) => ({
  url,
  path,
  channels,
}: DownloadListener): Promise<DownloadFinished> => {
  return new Promise((resolve, reject) => {
    try {
      const willDownloadListener = (event: Event, item: DownloadItem) => {
        item.setSavePath(path + item.getFilename())

        const onDownloadCancel = () => {
          item.cancel()
        }

        ipcMain.on(channels.Cancel, onDownloadCancel)

        const lastReceived = {
          bytes: item.getReceivedBytes(),
          time: Math.round(item.getStartTime()),
          interrupted: false,
        }

        item.on("updated", (_, state) => {
          const total = item.getTotalBytes()
          const received = item.getReceivedBytes()
          const percent = Math.round((received / total) * 100)
          const startTime = Math.round(item.getStartTime())
          const lastUpdate = new Date().getTime() / 1000
          const timeDiff = lastUpdate - startTime
          const timeLeft = (timeDiff / percent) * (100 - percent)
          const speed = Math.round(
            (received - lastReceived.bytes) / (lastUpdate - lastReceived.time)
          )

          const progress: DownloadProgress = {
            status: lastReceived.interrupted
              ? DownloadStatus.Interrupted
              : state,
            total,
            received,
            percent,
            timeLeft,
            speed,
          }

          /**
           *  Check if file is downloading and if not, wait for 5 seconds before
           *  cancelling download or cancel immediately if total file size
           *  is unknown.
           */
          if (received !== lastReceived.bytes) {
            lastReceived.bytes = received
            lastReceived.time = lastUpdate
          } else if (lastUpdate - lastReceived.time > 5 || total === 0) {
            lastReceived.interrupted = true
            item.cancel()
          }

          if (item.isPaused()) {
            progress.status = DownloadStatus.Paused
          }

          ipcMain.sendToRenderers(channels.Progress, progress)
        })

        item.once("done", (_, state) => {
          const finished: DownloadFinished = {
            status: lastReceived.interrupted
              ? DownloadStatus.Interrupted
              : state,
            directory: item.savePath,
            totalBytes: item.getTotalBytes(),
          }

          resolve(finished)

          ipcMain.removeListener(channels.Cancel, onDownloadCancel)
          win.webContents.session.removeListener(
            "will-download",
            willDownloadListener
          )
        })
      }

      win.webContents.session.on("will-download", willDownloadListener)
      win.webContents.downloadURL(url)
    } catch (error) {
      reject(error)
    }
  })
}

export default registerDownloadListener
