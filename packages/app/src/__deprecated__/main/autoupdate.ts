/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { autoUpdater } from "electron-updater"
import { ipcMain } from "electron-better-ipc"
import { BrowserWindow } from "electron"
import logger from "App/__deprecated__/main/utils/logger"

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
  ipcMain.answerRenderer(AppUpdateAction.Download, () => {
    void ipcMain.callRenderer(win, AppUpdateEvent.Error)
  })
}

const token = process.env.GITHUB_ACCESS_TOKEN
const repo = process.env.RELEASES_REPOSITORY_NAME

export default (win: BrowserWindow): void => {
  autoUpdater.setFeedURL({
    token,
    repo,
    private: true,
    provider: "github",
    owner: "Mudita",
  })
  autoUpdater.logger = logger
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false

  autoUpdater.on("update-available", ({ version }) => {
    void ipcMain.callRenderer(win, AppUpdateEvent.Available, version)
  })
  autoUpdater.on("update-not-available", () => {
    void ipcMain.callRenderer(win, AppUpdateEvent.NotAvailable)
  })
  autoUpdater.on("error", (error) => {
    void ipcMain.callRenderer(win, AppUpdateEvent.Error, error)
    void ipcMain.callRenderer(win, AppUpdateEvent.NotAvailable)
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
