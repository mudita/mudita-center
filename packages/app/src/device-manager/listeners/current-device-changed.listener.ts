/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { ListenerEvent } from "App/device-manager/constants"
import { connectDevice } from "App/device/actions"
import { DeviceProperties } from "App/device/modules/device"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const currentDeviceChangedHandler = (_: any, data: DeviceProperties): void => {
  if (!data) {
    return
  }
  void store.dispatch(connectDevice(data.deviceType))
}

export const offCurrentDeviceChangedListener = (): void => {
  ipcRenderer.off(
    ListenerEvent.CurrentDeviceChanged,
    currentDeviceChangedHandler
  )
}

export const registerCurrentDeviceChangedListener = (): (() => void) => {
  ipcRenderer.on(
    ListenerEvent.CurrentDeviceChanged,
    currentDeviceChangedHandler
  )

  return () => offCurrentDeviceChangedListener()
}
