/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceManagerEvent {
  HandleDeviceActivated = "device-manager_handle-device-activated",
  AddDevice = "device-manager_add-device",
  RemoveDevice = "device-manager_remove-device",
  SetActiveDevice = "device-manager_set-active-device",
  DeactivateDevice = "device-manager_deactivate-device",
  ConfigureDevice = "device-manager_configure-device",
  ConnectDevice = "device-manager_connect-device",
}
