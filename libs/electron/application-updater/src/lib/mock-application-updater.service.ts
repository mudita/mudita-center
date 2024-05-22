/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OnlineStatusService } from "shared/app-state"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"

export class MockApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor(private onlineStatusService: OnlineStatusService) {
    super()
  }
  public quitAndInstall(): void {
    this.onError()
  }

  public async downloadUpdate(): Promise<void> {
    this.onError()
  }

  public async checkForUpdatesAndNotify(): Promise<void> {
    if (this.onlineStatusService.online) {
      this.onUpdateNotAvailable()
    } else {
      this.onError()
    }
  }
}
