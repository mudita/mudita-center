/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRendererEvent } from "electron/renderer"
import { DeviceManagerMainEvent } from "Core/device-manager/constants"
import { DeviceBaseProperty } from "Core/device-manager/reducers/device-manager.interface"

export const registerDeviceConnectedListener = (
  handler: (property: DeviceBaseProperty) => void
): (() => void) => {
  const listener = (event: IpcRendererEvent, property: DeviceBaseProperty) =>
    handler(property)

  ipcRenderer.on(DeviceManagerMainEvent.DeviceConnected, listener)

  return () => {
    ipcRenderer.off(DeviceManagerMainEvent.DeviceConnected, listener)
  }
}
