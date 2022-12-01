/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"

const registerDeviceUnlockedListener = (
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (event: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceUnlocked, listener)
}

export const removeDeviceUnlockedListener = (
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (event: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceUnlocked, listener)
}

export default registerDeviceUnlockedListener
