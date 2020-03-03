import { BrowserWindow, DownloadItem } from "electron"
import { ipcMain } from "electron-better-ipc"
import {
  DownloadFinished,
  DownloadListener,
  DownloadProgress,
  DownloadStatus,
} from "Renderer/interfaces/file-download.interface"
import transferProgress from "Renderer/utils/transfer-progress"

const createDownloadListenerRegistrar = (win: BrowserWindow) => ({
  url,
  path,
  channels,
}: DownloadListener): Promise<DownloadFinished> => {
  return new Promise((resolve, reject) => {
    try {
      const willDownloadListener = (event: Event, item: DownloadItem) => {
        item.setSavePath(path + item.getFilename())

        const onDownloadCancel = (interrupt = false) => {
          interrupted = interrupt
          item.cancel()
        }

        ipcMain.on(channels.Cancel, (evt, interrupt) => {
          onDownloadCancel(interrupt)
        })

        let timeoutHelper: NodeJS.Timeout | null
        let downloadedBytes = 0
        let interrupted = false

        item.on("updated", (_, state) => {
          const total = item.getTotalBytes()
          const received = item.getReceivedBytes()

          const progress: DownloadProgress = {
            status: interrupted ? DownloadStatus.Interrupted : state,
            ...transferProgress(total, received, item.getStartTime()),
          }

          /**
           *  Check if file is downloading.
           *  If not, wait for 5 seconds before cancelling download.
           */
          if (downloadedBytes !== received) {
            if (timeoutHelper) {
              clearTimeout(timeoutHelper)
            }
            timeoutHelper = null
            downloadedBytes = received
          } else if (!timeoutHelper) {
            timeoutHelper = setTimeout(() => {
              onDownloadCancel(true)
            }, 5000)
          }

          if (item.isPaused()) {
            progress.status = DownloadStatus.Paused
          }

          ipcMain.sendToRenderers(channels.Progress, progress)
        })

        item.once("done", (_, state) => {
          const finished: DownloadFinished = {
            status: interrupted ? DownloadStatus.Interrupted : state,
            directory: item.savePath,
            totalBytes: item.getTotalBytes(),
          }

          resolve(finished)

          if (timeoutHelper) {
            clearTimeout(timeoutHelper)
          }

          ipcMain.removeAllListeners(channels.Cancel)
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

export default createDownloadListenerRegistrar
