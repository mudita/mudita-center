/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { DeviceManagerMainEvent } from "shared/utils"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { IpcRendererEvent } from "electron/renderer"

export const registerDeviceDetachedListener = (
  handler: (properties: DeviceBaseProperties) => void
): (() => void) => {
  const listener = (event: IpcRendererEvent, properties: DeviceBaseProperties) =>
    handler(properties)
  ipcRenderer.on(DeviceManagerMainEvent.DeviceDetached, listener)

  return () => {
    ipcRenderer.off(DeviceManagerMainEvent.DeviceDetached, listener)
  }
}
