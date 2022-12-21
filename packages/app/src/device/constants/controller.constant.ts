/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "device"

export enum IpcDeviceEvent {
  Connect = "connect",
  Disconnect = "disconnect",
  Unlock = "unlock",
  UnlockStatus = "unlock-status",
  LockTime = "lock-time",
  SetUpdating = "set-updating",
}

export enum IpcDeviceRequest {
  Connect = "device-connect",
  Disconnect = "device-disconnect",
  Unlock = "device-unlock",
  UnlockStatus = "device-unlock-status",
  LockTime = "device-lock-time",
  SetUpdating = "device-set-updating",
}
