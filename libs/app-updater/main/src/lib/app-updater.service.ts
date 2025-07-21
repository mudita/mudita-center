/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { autoUpdater, CancellationToken } from "electron-updater"
import logger from "electron-log/main"
import { isAxiosError } from "axios"
import semver from "semver/preload"
import { AppHttpService } from "app-utils/main"
import { AppResult, AppResultFactory, mapToAppError } from "app-utils/models"
import { AppUpdaterState } from "app-updater/models"

enum AppProgressBarState {
  Indeterminate = 2,
  Disabled = -1,
  Complete = 1,
}

export class AppUpdaterService {
  private cancellationToken = new CancellationToken()
  private checkAbortController = new AbortController()

  constructor(
    private mainWindow: BrowserWindow,
    private appHttpService: AppHttpService
  ) {
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
      const response = await this.appHttpService.request<{
        centerVersion: string
      }>({
        method: "GET",
        url: `${import.meta.env.VITE_MUDITA_CENTER_SERVER_URL}/v2-app-configuration?version=v3`,
        signal: this.checkAbortController.signal,
      })
      if (!response.ok) {
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

  async check(): Promise<AppResult<AppUpdaterState | null>> {
    try {
      const { signal } = this.checkAbortController

      const resultPromise = Promise.race([
        this.eventOnce<{ version: string }>(
          autoUpdater,
          "update-available",
          signal
        ),
        this.eventOnce<void>(autoUpdater, "update-not-available", signal).then(
          () => null
        ),
        this.eventOnce<Error>(autoUpdater, "error", signal).then((err) => {
          throw err
        }),
      ])

      const checkForUpdatesResult = await autoUpdater.checkForUpdatesAndNotify()
      if (checkForUpdatesResult === null) {
        return AppResultFactory.failed(mapToAppError("Update check failed"))
      }

      const result = await resultPromise

      if (result === null) {
        logger.info("No update available")
        return AppResultFactory.success(null)
      }

      const { version } = result
      logger.info("Update available:", version)
      const forced = await this.isForcedUpdate()
      logger.info("Is forced update:", forced)
      return AppResultFactory.success({ version, forced })
    } catch (error) {
      const msg =
        error instanceof Error && error.message === "Aborted"
          ? "Update check aborted"
          : "Update check failed"
      logger.error(msg, error)
      return AppResultFactory.failed(mapToAppError(msg))
    }
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

  private eventOnce<T>(
    emitter: NodeJS.EventEmitter,
    event: string,
    signal?: AbortSignal
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const onEvent = (payload: T) => {
        cleanup()
        resolve(payload)
      }
      const onError = (err: Error) => {
        cleanup()
        reject(err)
      }
      const onAbort = () => {
        cleanup()
        reject(new Error("Aborted"))
      }
      const cleanup = () => {
        emitter.removeListener(event, onEvent)
        emitter.removeListener("error", onError)
        signal?.removeEventListener("abort", onAbort)
      }

      emitter.once(event, onEvent)
      emitter.once("error", onError)
      signal?.addEventListener("abort", onAbort, { once: true })
    })
  }
}
