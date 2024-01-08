/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRendererEvent } from "electron/renderer"
import { DeviceManagerMainEvent } from "shared/utils"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"

export const registerDeviceConnectedListener = (
  handler: (properties: DeviceBaseProperties) => void
): (() => void) => {
  const listener = (event: IpcRendererEvent, properties: DeviceBaseProperties) =>
    handler(properties)

  ipcRenderer.on(DeviceManagerMainEvent.DeviceConnected, listener)

  return () => {
    ipcRenderer.off(DeviceManagerMainEvent.DeviceConnected, listener)
  }
}
