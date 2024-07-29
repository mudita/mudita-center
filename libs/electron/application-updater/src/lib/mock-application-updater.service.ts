/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MockUpdaterStateService } from "e2e-mock-server"
import { OnlineStatusService } from "shared/app-state"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"

export class MockApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor(
    private onlineStatusService: OnlineStatusService,
    private mockUpdaterStateService: MockUpdaterStateService
  ) {
    super()
  }
  public quitAndInstall(): void {
    this.onError()
  }

  public async downloadUpdate(): Promise<void> {
    this.onError()
  }

  public async checkForUpdatesAndNotify(): Promise<void> {
    if (!this.onlineStatusService.online) {
      return this.onError()
    }

    if (this.isUpdateAvailable()) {
      this.onUpdateAvailable(this.getUpdateVersion())
    } else {
      this.onUpdateNotAvailable()
    }
  }
  private isUpdateAvailable(): boolean {
    return this.mockUpdaterStateService.updateState.available
  }

  private getUpdateVersion(): string {
    return this.mockUpdaterStateService.updateState.version ?? "999.999.999"
  }
}
