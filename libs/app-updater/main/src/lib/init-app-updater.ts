/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, IpcMain } from "electron"
import { AppUpdaterService } from "./app-updater.service"
import { AppUpdaterIpcEvents } from "app-updater/models"
import { IpcMockServer } from "app-e2e-mock/server"

let appUpdaterService: AppUpdaterService

export const initAppUpdater = (
  ipcMain: IpcMain,
  mainWindow: BrowserWindow,
  mockServer: IpcMockServer
) => {
  console.log(
    `Initializing App Updater Service in ${mockServer.mockServiceEnabled ? "mock" : "real"} mode`
  )
  // TODO: MockAppUpdaterService will be handled as part of the Implement E2E tests for Application Update Check step
  if (!appUpdaterService) {
    appUpdaterService = new AppUpdaterService(mainWindow)

    ipcMain.removeHandler(AppUpdaterIpcEvents.Check)
    ipcMain.handle(AppUpdaterIpcEvents.Check, () => {
      return appUpdaterService.check()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Download)
    ipcMain.handle(AppUpdaterIpcEvents.Download, () => {
      appUpdaterService.download()
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Cancel)
    ipcMain.handle(AppUpdaterIpcEvents.Cancel, () => {
      appUpdaterService.cancel()
    })

    appUpdaterService.onDownloadProgress((percent: number) => {
      mainWindow.webContents.send(
        AppUpdaterIpcEvents.UpdateDownloadProgress,
        percent
      )
    })

    ipcMain.removeHandler(AppUpdaterIpcEvents.Install)
    ipcMain.handle(AppUpdaterIpcEvents.Install, () => {
      appUpdaterService.quitAndInstall()
    })
  }
}
