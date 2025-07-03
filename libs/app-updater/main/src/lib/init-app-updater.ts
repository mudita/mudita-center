/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, IpcMain } from "electron"
import { AppUpdaterService } from "./app-updater.service"
import { AppUpdaterIpcEvents } from "app-updater/models"

let appUpdaterService: AppUpdaterService

export const initAppUpdater = (ipcMain: IpcMain, mainWindow: BrowserWindow) => {
  if (!appUpdaterService) {
    appUpdaterService = new AppUpdaterService()

    ipcMain.removeHandler(AppUpdaterIpcEvents.Check)
    ipcMain.handle(AppUpdaterIpcEvents.Check, () => {
      return appUpdaterService.check()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Download)
    ipcMain.handle(AppUpdaterIpcEvents.Download, () => {
      mainWindow.setProgressBar(2) // Set progress bar to indeterminate state
      appUpdaterService.download()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Cancel)
    ipcMain.handle(AppUpdaterIpcEvents.Cancel, () => {
      appUpdaterService.cancel()
      mainWindow.setProgressBar(-1) // Disable progress bar (< 0)
    })

    appUpdaterService.onDownloadProgress((percent: number) => {
      mainWindow.webContents.send(
        AppUpdaterIpcEvents.UpdateDownloadProgress,
        percent
      )
      mainWindow.setProgressBar(percent < 100 ? percent / 100 : -1) // Disable progress bar if percent >= 100
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Install)
    ipcMain.handle(AppUpdaterIpcEvents.Install, () => {
      appUpdaterService.quitAndInstall()
    })
  }
}
