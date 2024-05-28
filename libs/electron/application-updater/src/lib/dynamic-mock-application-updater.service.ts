/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MockUpdaterStateService } from "e2e-mock-server"
import { ApplicationUpdaterService } from "./application-updater.service"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"
import { MockApplicationUpdaterService } from "./mock-application-updater.service"

export class DynamicMockApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor(
    private mockUpdaterStateService: MockUpdaterStateService,
    private applicationUpdaterService: ApplicationUpdaterService,
    private mockApplicationUpdaterService: MockApplicationUpdaterService
  ) {
    super()
  }

  private get updaterService(): BaseApplicationUpdaterService {
    if (this.mockUpdaterStateService.enabled) {
      return this.mockApplicationUpdaterService
    } else {
      return this.applicationUpdaterService
    }
  }
  public quitAndInstall(): void {
    this.updaterService.quitAndInstall()
  }

  public async downloadUpdate(): Promise<void> {
    await this.updaterService.downloadUpdate()
  }

  public async checkForUpdatesAndNotify(): Promise<void> {
    await this.updaterService.checkForUpdatesAndNotify()
  }
}
