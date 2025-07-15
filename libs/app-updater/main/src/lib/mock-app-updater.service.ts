/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import logger from "electron-log/main"
import { IpcMockServer } from "e2e-mock/server"
import { E2eMockIpcEvents } from "e2e-mock/models"
import { AppUpdaterState, SetAppUpdaterCheckPayload } from "app-updater/models"

export class MockAppUpdaterService {
  private checkResult: AppResult<AppUpdaterState | null> =
    AppResultFactory.success(null)

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
  }

  quitAndInstall(): void {
    logger.info("MockAppUpdaterService: quit and install called")
  }

  private registerListeners(): void {
    this.mockServer.on(
      E2eMockIpcEvents.setAppUpdaterCheckResult,
      this.handleSetAppUpdaterCheckResult
    )
  }

  private handleSetAppUpdaterCheckResult = ({
    error,
    ...appUpdaterState
  }: SetAppUpdaterCheckPayload) => {
    if (error) {
      this.checkResult = AppResultFactory.failed(new AppError())
    } else {
      this.checkResult = AppResultFactory.success(appUpdaterState)
    }
  }
}
