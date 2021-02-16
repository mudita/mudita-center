/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDisconnectedDeviceListener = (listener: () => void): void => {
  ipcRenderer.on(IpcEmitter.DisconnectedDevice, listener)
}

export const removeDisconnectedDeviceListener = (
  listener: () => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DisconnectedDevice, listener)
}

export default registerDisconnectedDeviceListener
