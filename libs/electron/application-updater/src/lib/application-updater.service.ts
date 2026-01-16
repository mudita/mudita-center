/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { autoUpdater } from "electron-updater"
import logger from "Core/__deprecated__/main/utils/logger"
import { IpcEvent } from "Core/core/decorators"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"
import { IpcApplicationUpdaterEvent } from "./ipc-application-updater.event"

const token = process.env.VITE_GH_RUNTIME_TOKEN
const repo = process.env.RELEASES_REPOSITORY_NAME
const prereleaseEnabled = process.env.PRERELEASES_ENABLED === "1"

export class ApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor() {
    super()
    this.configure()
    this.mountListeners()
  }

  @IpcEvent(IpcApplicationUpdaterEvent.Install)
  public quitAndInstall(): void {
    autoUpdater.quitAndInstall(true, true)
  }

  @IpcEvent(IpcApplicationUpdaterEvent.Download)
  public async downloadUpdate(): Promise<void> {
    await autoUpdater.downloadUpdate()
  }

  @IpcEvent(IpcApplicationUpdaterEvent.Check)
  public async checkForUpdatesAndNotify(): Promise<void> {
    await autoUpdater.checkForUpdatesAndNotify()
  }
  // https://api.github.com/repos/Mudita/mudita-center-pre-production/releases/latest
  // https://api.github.com/repos/Mudita/mudita-center-pre-production/releases
  // https://api.github.com/repos/Mudita/mudita-center-pre-production/releases/latest
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
