import { autoUpdater } from "electron-updater"
import { ipcMain } from "electron-better-ipc"
import log from "electron-log"
import { BrowserWindow } from "electron"

export enum AppUpdateStatus {
  Available = "app-update-available",
  Error = "app-update-error",
  Downloaded = "app-update-downloaded",
}

export enum AppUpdateActions {
  Download = "app-update-download",
  Install = "app-update-install",
}

export default (win: BrowserWindow) => {
  autoUpdater.logger = log
  // @ts-ignore
  autoUpdater.logger.transports.file.level = "info"
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on("update-available", info => {
    ipcMain.sendToRenderers(AppUpdateStatus.Available, info)
  })
  autoUpdater.on("error", error => {
    ipcMain.sendToRenderers(AppUpdateStatus.Error, error)
    win.setProgressBar(-1)
  })
  autoUpdater.on("download-progress", progressObj => {
    win.setProgressBar(progressObj.percent / 100)
  })
  autoUpdater.on("update-downloaded", info => {
    ipcMain.sendToRenderers(AppUpdateStatus.Downloaded, info)
    win.setProgressBar(-1)
  })

  ipcMain.answerRenderer(AppUpdateActions.Download, () => {
    autoUpdater.downloadUpdate()
  })

  ipcMain.answerRenderer(AppUpdateActions.Install, () => {
    autoUpdater.quitAndInstall(true, true)
  })

  return autoUpdater.checkForUpdatesAndNotify()
}
