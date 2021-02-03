import { autoUpdater } from "electron-updater"
import { ipcMain } from "electron-better-ipc"
import { BrowserWindow } from "electron"
import logger from "App/main/utils/logger"

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
  autoUpdater.logger = logger
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on("update-available", () => {
    ipcMain.callFocusedRenderer(AppUpdateStatus.Available)
  })
  autoUpdater.on("error", (error) => {
    ipcMain.callFocusedRenderer(AppUpdateStatus.Error, error)
    win.setProgressBar(-1)
  })
  autoUpdater.on("download-progress", (progressObj) => {
    win.setProgressBar(progressObj.percent / 100)
  })
  autoUpdater.on("update-downloaded", () => {
    ipcMain.callFocusedRenderer(AppUpdateStatus.Downloaded)
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
