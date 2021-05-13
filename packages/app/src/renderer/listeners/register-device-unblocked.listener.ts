/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDeviceUnblockedListener = (
  listener: (event: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceUnblocked, listener)
}

export const removeDeviceUnblockedListener = (
  listener: (event: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceUnblocked, listener)
}

export default registerDeviceUnblockedListener
