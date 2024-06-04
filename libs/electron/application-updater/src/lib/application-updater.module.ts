/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mockUpdaterStateService } from "e2e-mock-server"
import { onlineStatusService } from "shared/app-state"
import { ApplicationUpdaterController } from "./application-updater.controller"
import { ApplicationUpdaterService } from "./application-updater.service"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"
import { MockApplicationUpdaterService } from "./mock-application-updater.service"
import { DynamicMockApplicationUpdaterService } from "./dynamic-mock-application-updater.service"
import logger from "Core/__deprecated__/main/utils/logger"

export class ApplicationUpdaterModule {
  public controllers

  constructor() {
    const applicationUpdaterService = this.resolveApplicationUpdaterService()

    this.controllers = [
      new ApplicationUpdaterController(applicationUpdaterService),
    ]
  }

  private resolveApplicationUpdaterService(): BaseApplicationUpdaterService {
    const applicationUpdaterService = new ApplicationUpdaterService()

    logger.info(`resolveApplicationUpdaterService: ${process.env.MOCK_SERVICE_ENABLED}`)
    if (process.env.MOCK_SERVICE_ENABLED !== "1") {
      logger.info(`resolveApplicationUpdaterService: ${1}`)
      return applicationUpdaterService
    } else {
      logger.info(`resolveApplicationUpdaterService: ${2}`)
      return new DynamicMockApplicationUpdaterService(
        mockUpdaterStateService,
        applicationUpdaterService,
        new MockApplicationUpdaterService(
          onlineStatusService,
          mockUpdaterStateService
        )
      )
    }
  }
}
