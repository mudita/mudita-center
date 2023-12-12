/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ListenerEvent } from "Core/device-manager/constants"

export const registerDeviceDetachedListener = (
  handler: () => void
): (() => void) => {
  ipcRenderer.on(ListenerEvent.DeviceDetached, handler)

  return () => {
    ipcRenderer.off(ListenerEvent.DeviceDetached, handler)
  }
}
