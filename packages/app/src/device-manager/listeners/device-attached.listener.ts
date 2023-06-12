/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ListenerEvent } from "App/device-manager/constants"
import { Device } from "App/device/modules/device"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
const deviceAttachedHandler = (_: any, _data: Device): void => {}

export const registerDeviceAttachedListener = (): (() => void) => {
  ipcRenderer.on(ListenerEvent.DeviceAttached, deviceAttachedHandler)

  return () => {
    ipcRenderer.off(ListenerEvent.DeviceAttached, deviceAttachedHandler)
  }
}
