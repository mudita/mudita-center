/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcDesktopEvent {
  IsLinux = "desktop_is-linux",
  IsSudoMode = "desktop_is-sudo-mode",
  IsUserInSerialPortGroup = "desktop_is-user-in-serial-port-group",
  AddUserToSerialPortGroup = "desktop_add-user-to-serial-port-group",
}
