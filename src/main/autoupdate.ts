import { autoUpdater } from "electron-updater"
import { ipcMain } from "electron-better-ipc"
import log from "electron-log"
import { BrowserWindow } from "electron"

export enum AppUpdateStatus {
  Checking = "app-update-checking",
  Available = "app-update-available",
  NotAvailable = "app-update-not-available",
  Error = "app-update-error",
  Downloading = "app-update-downloading",
  Downloaded = "app-update-downloaded",
}

export default (win: BrowserWindow) => {
  autoUpdater.logger = log
  // @ts-ignore
  autoUpdater.logger.transports.file.level = "info"
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on("checking-for-update", info => {
    ipcMain.sendToRenderers(AppUpdateStatus.Checking, info)
  })
  autoUpdater.on("update-available", info => {
    ipcMain.sendToRenderers(AppUpdateStatus.Available, info)
  })
  autoUpdater.on("error", error => {
    ipcMain.sendToRenderers(AppUpdateStatus.Error, error)
  })
  autoUpdater.on("download-progress", progressObj => {
    ipcMain.sendToRenderers(AppUpdateStatus.Downloading, progressObj)
    win.setProgressBar(progressObj.percent / 100)
  })
  autoUpdater.on("update-downloaded", info => {
    ipcMain.sendToRenderers(AppUpdateStatus.Downloaded, info)
    win.setProgressBar(-1)
  })

  ipcMain.on("download-app-update", () => {
    autoUpdater.downloadUpdate()
  })

  ipcMain.on("install-app-update", () => {
    autoUpdater.quitAndInstall(true, true)
  })

  return autoUpdater.checkForUpdatesAndNotify()
}
