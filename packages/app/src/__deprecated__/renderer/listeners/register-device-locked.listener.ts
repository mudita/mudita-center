/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"

const registerDeviceLockedListener = (
  listener: (event: any, props: boolean) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceLocked, listener)
}

export const removeDeviceLockedListener = (
  listener: (event: any, props: boolean) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceLocked, listener)
}

export default registerDeviceLockedListener
