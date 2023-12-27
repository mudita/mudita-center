/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: Move from observers to app listeners
export enum DeviceServiceEvent {
  DeviceDisconnected = "device-service-disconnected",
  DeviceUnlocked = "device-service-unlocked",
  DeviceLocked = "device-service-locked",
}
