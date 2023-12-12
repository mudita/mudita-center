/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "Core/__deprecated__/renderer/store"
import { setLockTime } from "Core/device"
import { DeviceIpcEvent } from "Core/device/constants/device-ipc-event.constant"
import { GetPhoneLockTimeResponseBody } from "Core/device/types/mudita-os"

const registerDeviceLockedHandler = (
  _: unknown,
  data: GetPhoneLockTimeResponseBody | undefined
): void => {
  void store.dispatch(setLockTime(data))
}

export const registerDeviceLockTimeListener = (): (() => void) => {
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
