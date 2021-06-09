/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { autoUpdater } from "electron-updater"
import { ipcMain } from "electron-better-ipc"
import { BrowserWindow } from "electron"
import logger from "App/main/utils/logger"

export enum AppUpdateEvent {
  Available = "app-update-available",
  NotAvailable = "app-update-not-available",
  Error = "app-update-error",
  Downloaded = "app-update-downloaded",
}

export enum AppUpdateAction {
  Check = "app-update-check",
  Download = "app-update-download",
  Install = "app-update-install",
}

export const mockAutoupdate = (win: BrowserWindow): void => {
  ipcMain.answerRenderer(AppUpdateAction.Check, () => {
    void ipcMain.callRenderer(win, AppUpdateEvent.NotAvailable)
  })
}

export default (win: BrowserWindow): void => {
  autoUpdater.setFeedURL({
    private: true,
    provider: "github",
    token: process.env.GITHUB_ACCESS_TOKEN,
    owner: "Mudita",
    repo: "mudita-center",
  })
  autoUpdater.logger = logger
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on("update-available", () => {
    void ipcMain.callRenderer(win, AppUpdateEvent.Available)
  })
  autoUpdater.on("update-not-available", () => {
    void ipcMain.callRenderer(win, AppUpdateEvent.NotAvailable)
  })
  autoUpdater.on("error", (error) => {
    void ipcMain.callRenderer(win, AppUpdateEvent.Error, error)
    win.setProgressBar(-1)
  })
  autoUpdater.on("download-progress", ({ percent }) => {
    win.setProgressBar(percent / 100)
  })
  autoUpdater.on("update-downloaded", () => {
    void ipcMain.callRenderer(win, AppUpdateEvent.Downloaded)
    win.setProgressBar(-1)
  })
  ipcMain.answerRenderer(AppUpdateAction.Download, () => {
    void autoUpdater.downloadUpdate()
  })
  ipcMain.answerRenderer(AppUpdateAction.Install, () => {
    autoUpdater.quitAndInstall(true, true)
  })
  ipcMain.answerRenderer(AppUpdateAction.Check, () => {
    void autoUpdater.checkForUpdatesAndNotify()
  })
}
