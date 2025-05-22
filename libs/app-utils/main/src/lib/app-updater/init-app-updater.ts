/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppUpdaterService } from "./app-updater.service"
import { AppUpdaterIpcEvents } from "app-utils/models"

let appUpdaterService: AppUpdaterService | null = null

export const initAppUpdater = (ipcMain: IpcMain) => {
  if (!appUpdaterService) {
    appUpdaterService = new AppUpdaterService()

    ipcMain.handle(AppUpdaterIpcEvents.Check, () => {
      return appUpdaterService!.checkForUpdates()
    })

    ipcMain.handle(AppUpdaterIpcEvents.Download, () => {
      return appUpdaterService!.downloadUpdate()
    })

    ipcMain.handle(AppUpdaterIpcEvents.Install, () => {
      return appUpdaterService!.quitAndInstall()
    })
  }
}
