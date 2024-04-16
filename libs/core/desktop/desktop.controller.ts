/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { DesktopService } from "Core/desktop/desktop.service"
import { IpcDesktopEvent } from "Core/desktop/desktop.constants"

export class DesktopController {
  constructor(private desktopService: DesktopService) {}

  @IpcEvent(IpcDesktopEvent.IsLinux)
  public async isLinux(): Promise<boolean> {
    return this.desktopService.isLinux()
  }

  @IpcEvent(IpcDesktopEvent.HasUserSerialPortAccess)
  public async hasUserSerialPortAccess(): Promise<boolean> {
    return this.desktopService.hasUserSerialPortAccess()
  }

  @IpcEvent(IpcDesktopEvent.AddUserToSerialPortGroup)
  public async addUserToSerialPortGroup(): Promise<void> {
    return this.desktopService.addUserToSerialPortGroup()
  }
}
