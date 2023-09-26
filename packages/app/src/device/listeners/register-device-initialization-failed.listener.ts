/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"
import { setInitializationFailed } from "../actions"

const deviceInitializationFailedHandler = (): void => {
  void store.dispatch(setInitializationFailed(true))
}

export const registerDeviceInitializationFailedListener = (): (() => void) => {
  ipcRenderer.on(
    DeviceIpcEvent.DeviceInitializationFailed,
    deviceInitializationFailedHandler
  )

  return () => {
    ipcRenderer.off(
      DeviceIpcEvent.DeviceInitializationFailed,
      deviceInitializationFailedHandler
    )
  }
}
