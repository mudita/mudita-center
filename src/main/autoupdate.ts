import { autoUpdater } from "electron-updater"
import { ipcMain } from "electron-better-ipc"
import log from "electron-log"

export enum AppUpdateStatus {
  Checking = "app-update-checking",
  Available = "app-update-available",
  NotAvailable = "app-update-not-available",
  Error = "app-update-error",
  Downloading = "app-update-downloading",
  Downloaded = "app-update-downloaded",
}

export default () => {
  autoUpdater.logger = log
  // @ts-ignore
  autoUpdater.logger.transports.file.level = "info"
  autoUpdater.autoDownload = false

  autoUpdater.on("checking-for-update", (event, info) => {
    ipcMain.sendToRenderers(AppUpdateStatus.Checking, info)
  })
  autoUpdater.on("update-available", (event, info) => {
    ipcMain.sendToRenderers(AppUpdateStatus.Available, info)
  })
  autoUpdater.on("error", (event, error) => {
    ipcMain.sendToRenderers(AppUpdateStatus.Error, error)
  })
  autoUpdater.on("download-progress", (event, progressObj) => {
    ipcMain.sendToRenderers(AppUpdateStatus.Downloading, progressObj)
  })
  autoUpdater.on("update-downloaded", (event, info) => {
    ipcMain.sendToRenderers(AppUpdateStatus.Downloaded, info)
  })

  ipcMain.answerRenderer("download-app-update", () => {
    autoUpdater.downloadUpdate()
  })

  return autoUpdater.checkForUpdates()
}
