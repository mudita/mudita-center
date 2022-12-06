/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { Device } from "App/device/modules/device"
import { unlockedDevice } from "App/device"

// DEPRECATED
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceUnlockedHandler = (_: any, _data: Device): void => {
  void store.dispatch(unlockedDevice())
}

export const registerDeviceUnlockedListener = (): (() => void) => {
  ipcRenderer.on(IpcEmitter.DeviceUnlocked, deviceUnlockedHandler)

  return () => {
    ipcRenderer.off(IpcEmitter.DeviceUnlocked, deviceUnlockedHandler)
  }
}
