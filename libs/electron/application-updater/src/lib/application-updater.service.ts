/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { autoUpdater } from "electron-updater"
import logger from "Core/__deprecated__/main/utils/logger"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"

const token = process.env.GITHUB_ACCESS_TOKEN
const repo = process.env.RELEASES_REPOSITORY_NAME
const prereleaseEnabled = process.env.PRERELEASES_ENABLED === "1"

export class ApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor() {
    super()
    this.configure()
    this.mountListeners()
  }

  public quitAndInstall(): void {
    autoUpdater.quitAndInstall(true, true)
  }

  public async downloadUpdate(): Promise<void> {
    await autoUpdater.downloadUpdate()
  }
  public async checkForUpdatesAndNotify(): Promise<void> {
    await autoUpdater.checkForUpdatesAndNotify()
  }

  private configure(): void {
    autoUpdater.setFeedURL({
      token,
      repo,
      private: true,
      provider: "github",
      owner: "Mudita",
    })
    autoUpdater.logger = logger
    autoUpdater.allowPrerelease = prereleaseEnabled
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = false
  }

  private mountListeners(): void {
    autoUpdater.on("update-available", ({ version }) => {
      this.onUpdateAvailable(version)
    })
    autoUpdater.on("update-not-available", () => {
      this.onUpdateNotAvailable()
    })
    autoUpdater.on("error", (error) => {
      this.onError(error)
    })
    autoUpdater.on("download-progress", ({ percent }) => {
      this.onDownloadProgress(percent)
    })
    autoUpdater.on("update-downloaded", () => {
      this.onUpdateDownloaded()
    })
  }
}
