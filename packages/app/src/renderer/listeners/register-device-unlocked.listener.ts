/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDeviceUnlockedListener = (
  listener: (event: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceUnlocked, listener)
}

export const removeDeviceUnlockedListener = (
  listener: (event: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceUnlocked, listener)
}

export default registerDeviceUnlockedListener
