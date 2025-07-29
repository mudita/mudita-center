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
import {
  AppError,
  AppResult,
  AppResultFactory,
  mapToAppError,
} from "app-utils/models"
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

  async download() {
    logger.info("[AppUpdater] download invoked")
    this.mainWindow.setProgressBar(AppProgressBarState.Indeterminate)

    const updateDownloaded = this.eventOnce<{ version: string }>(
      autoUpdater,
      "update-downloaded"
    ).then((payload) => {
      logger.info(
        `[AppUpdater] Update downloaded successfully: v${payload.version}`
      )
      return payload
    })

    const updateError = this.eventOnce<Error>(autoUpdater, "error").then(
      (err) => {
        logger.error("[AppUpdater] Error emitted during update download", err)
        throw err
      }
    )

    try {
      logger.info("[AppUpdater] Starting autoUpdater.downloadUpdate()...")
      await autoUpdater.downloadUpdate(this.cancellationToken)

      logger.info(
        "[AppUpdater] Waiting for 'update-downloaded' or 'error' event..."
      )
      await Promise.race([updateDownloaded, updateError])

      logger.info("[AppUpdater] Download phase completed")
      return AppResultFactory.success()
    } catch (e) {
      logger.error("[AppUpdater] Download failed", e)
      this.mainWindow.setProgressBar(AppProgressBarState.Disabled)
      return AppResultFactory.failed(new AppError("Download failed"))
    }
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

  async quitAndInstall() {
    logger.info("[AppUpdater] quitAndInstall invoked")

    const timeoutAfterNoExit = new Promise<void>((resolve) => {
      setTimeout(() => {
        logger.warn(
          "[AppUpdater] App did not quit within 10s after quitAndInstall – continuing"
        )
        resolve()
      }, 10000)
    })

    const installError = this.eventOnce<Error>(autoUpdater, "error").then(
      (err) => {
        logger.error("[AppUpdater] Error emitted during quitAndInstall", err)
        throw err
      }
    )

    logger.info("[AppUpdater] Calling autoUpdater.quitAndInstall()...")
    autoUpdater.quitAndInstall(true, true)

    try {
      await Promise.race([timeoutAfterNoExit, installError])

      logger.warn("[AppUpdater] App still running after quitAndInstall")
      this.mainWindow.setProgressBar(AppProgressBarState.Disabled)
      return AppResultFactory.failed(
        new AppError("Application failed to restart for update installation")
      )
    } catch (err) {
      logger.error("[AppUpdater] quitAndInstall failed with error", err)
      this.mainWindow.setProgressBar(AppProgressBarState.Disabled)
      return AppResultFactory.failed(new AppError("Installation failed"))
    }
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
