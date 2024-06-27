/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MockUpdaterStateService } from "e2e-mock-server"
import { IOnlineStatusService } from "shared/app-state"
import { IpcEvent } from "Core/core/decorators"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"
import { IpcApplicationUpdaterEvent } from "./ipc-application-updater.event"

export class MockApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor(
    private onlineStatusService: IOnlineStatusService,
    private mockUpdaterStateService: MockUpdaterStateService
  ) {
    super()
  }
  public quitAndInstall(): void {}

  @IpcEvent(IpcApplicationUpdaterEvent.Download)
  public async downloadUpdate(): Promise<void> {
    if (this.isUpdateDownloaded()) {
      this.onUpdateDownloaded()
    } else {
      this.onError()
    }
  }

  @IpcEvent(IpcApplicationUpdaterEvent.Check)
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

  private isUpdateDownloaded(): boolean {
    return this.mockUpdaterStateService.updateState.downloaded ?? true
  }

  private isUpdateAvailable(): boolean {
    return this.mockUpdaterStateService.updateState.available
  }

  private getUpdateVersion(): string {
    return this.mockUpdaterStateService.updateState.version ?? "999.999.999"
  }
}
