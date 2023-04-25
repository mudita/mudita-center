/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { ListenerEvent } from "App/device-manager/constants"
import { setConnectionStatus } from "App/device/actions"
import { resetUploadingState } from "App/files-manager/actions"

const deviceDetachedHandler = (_: Electron.IpcRendererEvent): void => {
  void store.dispatch(resetUploadingState())
  void store.dispatch(setConnectionStatus(false))
}

export const registerDeviceDetachedListener = (): (() => void) => {
  ipcRenderer.on(ListenerEvent.DeviceDetached, deviceDetachedHandler)

  return () => {
    ipcRenderer.off(ListenerEvent.DeviceDetached, deviceDetachedHandler)
  }
}
