/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { PureStrategyMainEvent } from "Core/device/strategies"

export const registerActiveDeviceLockedListener = (
  handler: () => void
): (() => void) => {

  ipcRenderer.on(PureStrategyMainEvent.ActiveDeviceLocked, handler)

  return () => {
    ipcRenderer.off(PureStrategyMainEvent.ActiveDeviceLocked, handler)
  }
}
