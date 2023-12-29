/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceManagerMainEvent } from "Core/device-manager/constants"

export const registerActiveDeviceLockedListener = (
  handler: () => void
): (() => void) => {

  ipcRenderer.on(DeviceManagerMainEvent.ActiveDeviceLocked, handler)

  return () => {
    ipcRenderer.off(DeviceManagerMainEvent.ActiveDeviceLocked, handler)
  }
}
