/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, DownloadItem } from "electron"
import { ipcMain } from "electron-better-ipc"
import {
  DownloadChannel,
  DownloadFinished,
  DownloadListener,
  DownloadProgress,
  DownloadStatus,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"
import transferProgress from "App/__deprecated__/renderer/utils/transfer-progress"
import path from "path"
import fs from "fs-extra"
import getAppSettingsMain from "./get-app-settings"
import logger from "App/__deprecated__/main/utils/logger"

const registeredChannels: string[] = []

export const createDownloadChannels = (uniqueKey: string): DownloadChannel => {
  if (registeredChannels.includes(uniqueKey)) {
    console.warn(
      `The "${uniqueKey}" download channel key is not unique. This may cause unexpected issues.`
    )
  } else {
    registeredChannels.push(uniqueKey)
  }

  return {
    start: uniqueKey + "-download-start",
    progress: uniqueKey + "-download-progress",
    cancel: uniqueKey + "-download-cancel",
    done: uniqueKey + "-download-finished",
  }
}

const removeOldDownloadFiles = async (filename: string) => {
  const { osDownloadLocation } = await getAppSettingsMain()
  fs.readdir(osDownloadLocation, (error, files) => {
    if (error) {
      logger.error(error)
    }
    files.forEach((file) => {
      const fileDir = path.join(osDownloadLocation, file)
      if (file !== filename) {
        fs.unlinkSync(fileDir)
      }
    })
  })
}

const createDownloadListenerRegistrar =
  (win: BrowserWindow) =>
  ({
    url,
    fileName,
    savePath,
    channels,
  }: DownloadListener): Promise<DownloadFinished> => {
    return new Promise((resolve, reject) => {
      try {
        const willDownloadListener = (event: Event, item: DownloadItem) => {
          item.setSavePath(path.join(savePath, fileName))

          const onDownloadCancel = (interrupt = false) => {
            interrupted = interrupt
            item.cancel()
          }

          ipcMain.on(channels.cancel, (evt, interrupt) => {
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

            ipcMain.sendToRenderers(channels.progress, progress)
          })

          item.once("done", (_, state) => {
            const finished: DownloadFinished = {
              status: interrupted ? DownloadStatus.Interrupted : state,
              directory: item.savePath,
              totalBytes: item.getTotalBytes(),
            }

            removeOldDownloadFiles(fileName)

            resolve(finished)

            if (timeoutHelper) {
              clearTimeout(timeoutHelper)
            }

            ipcMain.removeAllListeners(channels.cancel)
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
