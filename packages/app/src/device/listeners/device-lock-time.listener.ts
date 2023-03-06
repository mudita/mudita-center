/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { setLockTime } from "App/device"

import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"
import { GetPhoneLockTimeResponseBody } from "App/device/types/mudita-os"

const registerDeviceLockedHandler = (
  _: unknown,
  data: GetPhoneLockTimeResponseBody | undefined
): void => {
  void store.dispatch(setLockTime(data))
}

export const registerDeviceLockedListener = (): (() => void) => {
  ipcRenderer.on(
    DeviceIpcEvent.DeviceLockTimeUpdated,
    registerDeviceLockedHandler
  )

  return () => {
    ipcRenderer.off(
      DeviceIpcEvent.DeviceLockTimeUpdated,
      registerDeviceLockedHandler
    )
  }
}
