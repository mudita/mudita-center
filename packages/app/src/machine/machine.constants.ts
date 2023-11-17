/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcMachineEvent {
  IsLinux = "machine_is-linux",
  IsSudoMode = "machine_is-sudo-mode",
  IsUserInSerialPortGroup = "machine_is-user-in-serial-port-group",
  AddUserToSerialPortGroup = "machine_add-user-to-serial-port-group",
}
