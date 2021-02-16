/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerConnectedDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.ConnectedDevice, listener)
}

export const removeConnectedDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.ConnectedDevice, listener)
}

export default registerConnectedDeviceListener
