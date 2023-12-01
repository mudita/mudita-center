/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcDeviceEvent {
  Connect = "device_connect",
  Unlock = "device_unlock",
  UnlockStatus = "device_unlock-status",
  LockTime = "device_lock-time",
  SetUpdating = "device_set-updating",
}
