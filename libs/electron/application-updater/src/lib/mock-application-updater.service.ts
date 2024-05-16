/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseApplicationUpdaterService } from "./base-application-updater.service"

export class MockApplicationUpdaterService extends BaseApplicationUpdaterService {
  constructor() {
    super()
  }
  public quitAndInstall(): void {
    this.onError()
  }

  public async downloadUpdate(): Promise<void> {
    this.onError()
  }
  public async checkForUpdatesAndNotify(): Promise<void> {
    this.onUpdateNotAvailable()
  }
}
