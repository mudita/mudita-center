/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ListenerEvent } from "App/device-manager/constants"
import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { handleDeviceDetached } from "App/update/actions"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceDetachedHandler = (_: any, _data: string): void => {
  void store.dispatch(handleDeviceDetached())
}

export const registerDownloadCancelOnDeviceDetachedListener =
  (): (() => void) => {
    ipcRenderer.on(ListenerEvent.DeviceDetached, deviceDetachedHandler)

    return () => {
      ipcRenderer.off(ListenerEvent.DeviceDetached, deviceDetachedHandler)
    }
  }
