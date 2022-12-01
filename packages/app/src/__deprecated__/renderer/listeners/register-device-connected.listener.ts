/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"

const registerDeviceConnectedListener = (
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceConnected, listener)
}

export const removeDeviceConnectedListener = (
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceConnected, listener)
}

export default registerDeviceConnectedListener
