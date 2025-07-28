/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isEmpty } from "lodash"
import logger from "electron-log/main"
import { IpcMockServer } from "e2e-mock/server"
import { E2eMockIpcEvents } from "e2e-mock/models"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { delay } from "app-utils/common"
import { AppUpdaterState, SetAppUpdaterPayload } from "app-updater/models"

export class MockAppUpdaterService {
  private checkResult: AppResult<AppUpdaterState | null> =
    AppResultFactory.success(null)
  private downloadResult: AppResult = AppResultFactory.success(null)
  private installResult: AppResult = AppResultFactory.success(null)
  private downloadProgressCallbacks: Array<(percent: number) => void> = []

  constructor(private mockServer: IpcMockServer) {
    this.registerListeners()
  }

  async check(): Promise<AppResult<AppUpdaterState | null>> {
    logger.info("MockAppUpdaterService: check for updates called")
    return this.checkResult
  }

  async download(): Promise<AppResult> {
    logger.info("MockAppUpdaterService: download updates called")
    if (this.downloadResult.ok) {
      // TODO: Remove this workaround after fixing the download application logic
      await delay(2500)
      this.handleEmitAppUpdaterDownloadProgressEvent(100)
      return this.downloadResult
    } else {
      return this.downloadResult
    }
  }

  cancel(): void {
    logger.info("MockAppUpdaterService: cancel updates called")
  }

  onDownloadProgress(callback: (percent: number) => void): void {
    logger.info("MockAppUpdaterService: onDownloadProgress called")
    this.downloadProgressCallbacks.push(callback)
  }

  async quitAndInstall(): Promise<AppResult> {
    logger.info("MockAppUpdaterService: quit and install called")
    return this.installResult
  }

  private registerListeners(): void {
    this.mockServer.on(
      E2eMockIpcEvents.setAppUpdaterState,
      this.handleSetAppUpdaterState
    )
    this.mockServer.on(
      E2eMockIpcEvents.emitAppUpdaterDownloadProgressEvent,
      this.handleEmitAppUpdaterDownloadProgressEvent
    )
  }

  private handleSetAppUpdaterState = ({
    check,
    download,
    install,
  }: SetAppUpdaterPayload) => {
    if (check?.error) {
      this.checkResult = AppResultFactory.failed(new AppError())
    } else {
      this.checkResult = AppResultFactory.success(isEmpty(check) ? null : check)
    }

    this.downloadResult = download?.error
      ? AppResultFactory.failed(new AppError("Download failed"))
      : AppResultFactory.success(undefined)

    this.installResult = install?.error
      ? AppResultFactory.failed(new AppError("Install failed"))
      : AppResultFactory.success(undefined)
  }

  private handleEmitAppUpdaterDownloadProgressEvent = (percent: number) => {
    logger.info(`MockAppUpdaterService: emitting download progress ${percent}%`)
    for (const cb of this.downloadProgressCallbacks) {
      try {
        cb(percent)
      } catch (err) {
        logger.error("Error in downloadProgress callback", err)
      }
    }
  }
}
