/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "App/core/decorators"
import { MachineService } from "App/machine/machine.service"
import { IpcMachineEvent } from "App/machine/machine.constants"

export class MachineController {
  constructor(private machineService: MachineService) {}

  @IpcEvent(IpcMachineEvent.IsLinux)
  public async isLinux(): Promise<boolean> {
    return this.machineService.isLinux()
  }

  @IpcEvent(IpcMachineEvent.IsSudoMode)
  public async isSudoMode(): Promise<boolean> {
    return this.machineService.isSudoMode()
  }

  @IpcEvent(IpcMachineEvent.IsUserInSerialPortGroup)
  public async isUserInSerialPortGroup(): Promise<boolean> {
    return this.machineService.isUserInSerialPortGroup()
  }

  @IpcEvent(IpcMachineEvent.AddUserToSerialPortGroup)
  public async addUserToSerialPortGroup(): Promise<void> {
    return this.machineService.addUserToSerialPortGroup()
  }
}
