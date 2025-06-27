/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppUpdaterService } from "./app-updater.service"
import { AppUpdaterIpcEvents } from "app-utils/models"

let appUpdaterService: AppUpdaterService

export const initAppUpdater = (ipcMain: IpcMain) => {
  if (!appUpdaterService) {
    appUpdaterService = new AppUpdaterService()

    ipcMain.removeHandler(AppUpdaterIpcEvents.Check)
    ipcMain.handle(AppUpdaterIpcEvents.Check, () => {
      return appUpdaterService.checkForUpdates()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Download)
    ipcMain.handle(AppUpdaterIpcEvents.Download, () => {
      return appUpdaterService.downloadUpdate()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Install)
    ipcMain.handle(AppUpdaterIpcEvents.Install, () => {
      return appUpdaterService.quitAndInstall()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.CancelDownload)
    ipcMain.handle(AppUpdaterIpcEvents.CancelDownload, () => {
      return appUpdaterService.quitAndInstall()
    })
  }
}
