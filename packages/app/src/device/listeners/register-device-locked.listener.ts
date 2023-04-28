/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { lockedDevice } from "App/device"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"

const deviceLockedHandler = (): void => {
  void store.dispatch(lockedDevice())
}

export const registerDeviceLockedListener = (): (() => void) => {
  ipcRenderer.on(DeviceIpcEvent.DeviceLocked, deviceLockedHandler)

  return () => {
    ipcRenderer.off(DeviceIpcEvent.DeviceLocked, deviceLockedHandler)
  }
}
