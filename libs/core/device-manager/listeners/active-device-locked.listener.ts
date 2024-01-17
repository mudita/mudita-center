/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRendererEvent } from "electron/renderer"
import { PureStrategyMainEvent } from "Core/device/strategies"

export const registerActiveDeviceLockedListener = (
  handler: (data: { path: string }) => void
): (() => void) => {
  const listener = (event: IpcRendererEvent, data: { path: string }) =>
    handler(data)

  ipcRenderer.on(PureStrategyMainEvent.ActiveDeviceLocked, listener)

  return () => {
    ipcRenderer.off(PureStrategyMainEvent.ActiveDeviceLocked, listener)
  }
}
