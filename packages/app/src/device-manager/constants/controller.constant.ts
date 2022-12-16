/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "device-manager"

export enum IpcDeviceManagerEvent {
  GetDevices = "get-devices",
  GetCurrentDevice = "get-current-device",
  SetCurrentDevice = "set-current-device",
}

export enum IpcDeviceManagerRequest {
  GetDevices = "device-manager-get-devices",
  GetCurrentDevice = "device-manager-get-current-device",
  SetCurrentDevice = "device-manager-set-current-device",
}
