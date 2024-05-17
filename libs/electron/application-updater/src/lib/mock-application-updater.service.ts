/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ConnectionStateService } from "e2e-mock-server"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"

export class MockApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor(private connectionStateService: ConnectionStateService) {
    super()
  }
  public quitAndInstall(): void {
    this.onError()
  }

  public async downloadUpdate(): Promise<void> {
    this.onError()
  }

  public async checkForUpdatesAndNotify(): Promise<void> {
    if (this.connectionStateService.online) {
      this.onUpdateNotAvailable()
    } else {
      this.onError()
    }
  }
}
