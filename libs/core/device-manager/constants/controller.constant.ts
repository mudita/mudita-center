/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "device-manager"

export enum IpcDeviceManagerEvent {
  SetActiveDevice = "device-manager_set-active-device",
  GetDeviceConfiguration = "device-manager_get-device-configuration",
}
