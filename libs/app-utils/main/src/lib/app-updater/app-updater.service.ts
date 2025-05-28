/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { autoUpdater } from "electron-updater"
import { AppUpdateEvent, AppUpdaterIpcEvents } from "app-utils/models"
import { BrowserWindow } from "electron"
import { getMainAppWindow } from "../window/window-registry"

export class AppUpdaterService {
  private readonly window: BrowserWindow

  constructor() {
    const win = getMainAppWindow()
    if (!win) throw new Error("Main application window not found")
    this.window = win

    this.configure()
    this.mountListeners()
  }

  private configure(): void {
    autoUpdater.setFeedURL({
      provider: "github",
      owner: "Mudita",
      repo: "mudita-center",
      private: true,
      token: process.env.GITHUB_ACCESS_TOKEN,
    })

    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = false
  }

  private mountListeners(): void {
    autoUpdater.on("update-available", ({ version }) => {
      this.window.webContents.send(AppUpdateEvent.Available, version)
    })
    autoUpdater.on("update-not-available", () => {
      this.window.webContents.send(AppUpdateEvent.NotAvailable)
    })
    autoUpdater.on("error", (error) => {
      this.window.webContents.send(AppUpdateEvent.Error, error)
      this.window.setProgressBar(-1)
    })
    autoUpdater.on("download-progress", ({ percent }) => {
      this.window.setProgressBar(percent / 100)
    })
    autoUpdater.on("update-downloaded", () => {
      this.window.webContents.send(AppUpdateEvent.Downloaded)
      this.window.setProgressBar(-1)
    })
    autoUpdater.on("download-progress", (progress) => {
      this.window?.webContents.send(
        AppUpdaterIpcEvents.UpdateDownloadProgress,
        Math.floor(progress.percent)
      )
    })
    autoUpdater.on("update-downloaded", () => {
      let installProgress = 0
      const installInterval = setInterval(() => {
        installProgress += 5
        this.window?.webContents.send(
          AppUpdaterIpcEvents.UpdateInstallProgress,
          Math.min(installProgress, 100)
        )

        if (installProgress >= 100) {
          clearInterval(installInterval)
        }
      }, 200)
    })
    autoUpdater.on("update-cancelled", () => {
      this.window.webContents.send(AppUpdateEvent.Error, {
        message: "Update download was cancelled by user",
      })
      this.window.setProgressBar(-1)
    })
  }

  public async checkForUpdates(): Promise<void> {
    await autoUpdater.checkForUpdatesAndNotify()
    // this.window.webContents.send(AppUpdateEvent.Available, "999.0.0")
  }

  public async downloadUpdate(): Promise<void> {
    await autoUpdater.downloadUpdate()
  }

  public quitAndInstall(): void {
    autoUpdater.quitAndInstall(true, true)
  }
}
