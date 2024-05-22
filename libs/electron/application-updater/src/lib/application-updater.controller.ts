/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcApplicationUpdaterEvent } from "./ipc-application-updater.event"
import { BaseApplicationUpdaterService } from "./base-application-updater.service"

export class ApplicationUpdaterController {
  constructor(
    private applicationUpdaterService: BaseApplicationUpdaterService
  ) {}

  @IpcEvent(IpcApplicationUpdaterEvent.Check)
  public async check(): Promise<unknown> {
    return this.applicationUpdaterService.checkForUpdatesAndNotify()
  }
  @IpcEvent(IpcApplicationUpdaterEvent.Install)
  public async install(): Promise<unknown> {
    return this.applicationUpdaterService.quitAndInstall()
  }
  @IpcEvent(IpcApplicationUpdaterEvent.Download)
  public async download(): Promise<unknown> {
    return this.applicationUpdaterService.downloadUpdate()
  }
}
