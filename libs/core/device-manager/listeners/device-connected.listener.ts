/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceManagerMainEvent } from "Core/device-manager/constants"

export const registerDeviceConnectedListener = (
  handler: () => void
): (() => void) => {
  ipcRenderer.on(DeviceManagerMainEvent.DeviceConnected, handler)

  return () => {
    ipcRenderer.off(DeviceManagerMainEvent.DeviceConnected, handler)
  }
}
