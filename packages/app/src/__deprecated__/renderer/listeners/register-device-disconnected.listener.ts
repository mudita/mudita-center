/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"

const registerDeviceDisconnectedListener = (listener: () => void): void => {
  ipcRenderer.on(IpcEmitter.DeviceDisconnected, listener)
}

export const removeDeviceDisconnectedListener = (
  listener: () => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceDisconnected, listener)
}

export default registerDeviceDisconnectedListener
