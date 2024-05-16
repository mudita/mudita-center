/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApplicationUpdaterController } from "./application-updater.controller"
import { ApplicationUpdaterService } from "./application-updater.service"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"
import { MockApplicationUpdaterService } from "./mock-application-updater.service"

export class ApplicationUpdaterModule {
  public controllers

  constructor() {
    const applicationUpdaterService = this.resolveApplicationUpdaterService()

    this.controllers = [
      new ApplicationUpdaterController(applicationUpdaterService),
    ]
  }

  private resolveApplicationUpdaterService(): BaseApplicationUpdaterService {
    if (process.env.NODE_ENV === "production") {
      return new ApplicationUpdaterService()
    } else {
      return new MockApplicationUpdaterService()
    }
  }
}
