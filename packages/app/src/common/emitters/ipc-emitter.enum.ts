/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcEmitter {
  DeviceDisconnected = "device-disconnected",
  DeviceConnected = "device-connected",
  DeviceBlocked = "blocked-device",
  DeviceUnblocked = "unblocked-device",
  OsUpdateProgress = "os-update-progress",
}
