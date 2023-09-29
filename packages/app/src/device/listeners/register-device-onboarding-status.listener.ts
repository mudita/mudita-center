/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { setOnboardingStatus, DeviceIpcEvent } from "App/device"

const deviceOnboardingStatusHandler = (_: unknown, value: boolean): void => {
  void store.dispatch(setOnboardingStatus(value))
}

export const registerDeviceOnboardingStatusListener = (): (() => void) => {
  ipcRenderer.on(
    DeviceIpcEvent.DeviceOnboardingStatus,
    deviceOnboardingStatusHandler
  )

  return () => {
    ipcRenderer.off(
      DeviceIpcEvent.DeviceOnboardingStatus,
      deviceOnboardingStatusHandler
    )
  }
}
