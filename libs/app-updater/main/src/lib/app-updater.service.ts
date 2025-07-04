/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { autoUpdater, CancellationToken } from "electron-updater"
import logger from "electron-log/main"
import axios, { isAxiosError } from "axios"
import semver from "semver/preload"

enum AppProgressBarState {
  Indeterminate = 2,
  Disabled = -1,
  Complete = 1,
}

export class AppUpdaterService {
  private cancellationToken = new CancellationToken()
  private checkAbortController = new AbortController()

  constructor(private mainWindow: BrowserWindow) {
    this.configure()
  }

  private configure(): void {
    autoUpdater.logger = logger
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = false
    autoUpdater.forceDevUpdateConfig =
      process.env.DEV_APPUPDATE_ENABLED === "true"
  }

  private async isForcedUpdate() {
    try {
      const response = await axios.get<{ centerVersion: string }>(
        `${import.meta.env.VITE_MUDITA_CENTER_SERVER_URL}/v2-app-configuration?version=v3`
      )
      if (!response.data) {
        return false
      }
      return semver.lt(autoUpdater.currentVersion, response.data.centerVersion)
    } catch (error) {
      if (isAxiosError(error)) {
        logger.error(
          "Failed to fetch forced update configuration:",
          error.message || "Unknown error",
          "Status:",
          error.status
        )
      } else {
        logger.error("Unexpected error while checking forced update", error)
      }
      return false
    }
  }

  async check() {
    return new Promise<
      { version: string; forced: boolean } | { error: true } | null
    >((resolve) => {
      const { signal } = this.checkAbortController

      const cleanup = (): void => {
        signal.removeEventListener("abort", onAbort)
      }

      const onAbort = (): void => {
        cleanup()
        resolve(null)
      }

      signal.addEventListener("abort", onAbort, { once: true })

      if (signal.aborted) {
        onAbort()
        resolve(null)
        return
      }

      void autoUpdater.checkForUpdatesAndNotify()
      autoUpdater.once("update-available", async ({ version }) => {
        cleanup()
        const forced = await this.isForcedUpdate()
        // FIXME: Implement ObjectResponse pattern
        resolve({
          version,
          forced,
        })
      })
      autoUpdater.once("update-not-available", () => {
        cleanup()
        resolve(null)
      })
      autoUpdater.once("error", (error) => {
        cleanup()
        logger.error("Update check error:", error)
        resolve({ error: true })
      })
    })
  }

  download() {
    this.mainWindow.setProgressBar(AppProgressBarState.Indeterminate)
    void autoUpdater.downloadUpdate(this.cancellationToken)
  }

  cancel() {
    this.mainWindow.setProgressBar(AppProgressBarState.Disabled)

    this.cancellationToken.cancel()
    this.cancellationToken = new CancellationToken()

    this.checkAbortController.abort()
    this.checkAbortController = new AbortController()
  }

  onDownloadProgress(callback: (percent: number) => void) {
    autoUpdater.on("download-progress", ({ percent }) => {
      this.mainWindow.setProgressBar(percent / 100)
      callback(percent)
    })

    autoUpdater.on("update-downloaded", () => {
      this.mainWindow.setProgressBar(AppProgressBarState.Complete)
      callback(100)
    })
  }

  quitAndInstall() {
    autoUpdater.quitAndInstall(true, true)
  }
}
