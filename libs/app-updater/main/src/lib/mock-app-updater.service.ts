/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isEmpty } from "lodash"
import logger from "electron-log/main"
import { IpcMockServer } from "e2e-mock/server"
import { E2eMockIpcEvents } from "e2e-mock/models"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { AppUpdaterState, SetAppUpdaterCheckPayload } from "app-updater/models"

export class MockAppUpdaterService {
  private checkResult: AppResult<AppUpdaterState | null> =
    AppResultFactory.success(null)
  private downloadProgressCallbacks: Array<(percent: number) => void> = []

  constructor(private mockServer: IpcMockServer) {
    this.registerListeners()
  }

  async check(): Promise<AppResult<AppUpdaterState | null>> {
    logger.info("MockAppUpdaterService: check for updates called")
    return this.checkResult
  }

  download(): void {
    logger.info("MockAppUpdaterService: download updates called")
  }

  cancel(): void {
    logger.info("MockAppUpdaterService: cancel updates called")
  }

  onDownloadProgress(callback: (percent: number) => void): void {
    logger.info("MockAppUpdaterService: onDownloadProgress called")
    this.downloadProgressCallbacks.push(callback)
  }

  quitAndInstall(): void {
    logger.info("MockAppUpdaterService: quit and install called")
  }

  private registerListeners(): void {
    this.mockServer.on(
      E2eMockIpcEvents.setAppUpdaterCheckResult,
      this.handleSetAppUpdaterCheckResult
    )
    this.mockServer.on(
      E2eMockIpcEvents.emitAppUpdaterDownloadProgressEvent,
      this.handleEmitAppUpdaterDownloadProgressEvent
    )
  }

  private handleSetAppUpdaterCheckResult = (
    payload: SetAppUpdaterCheckPayload
  ) => {
    if (payload?.error) {
      this.checkResult = AppResultFactory.failed(new AppError())
    } else {
      this.checkResult = AppResultFactory.success(
        isEmpty(payload) ? null : payload
      )
    }
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
