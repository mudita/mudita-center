/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppResult, AppResultFactory } from "app-utils/models"
import logger from "electron-log/main"

export class MockAppUpdaterService {
  async check(): Promise<
    AppResult<{ version: string; forced: boolean } | null>
  > {
    logger.info("MockAppUpdaterService: check for updates called")
    return AppResultFactory.success({
      version: "5.0.0",
      forced: true,
    })
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
}
