/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ListenerEvent } from "App/device-manager/constants"
import { clearState } from "App/update/actions"
import store from "App/__deprecated__/renderer/store"
import { ipcRenderer } from "electron-better-ipc"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceDetachedHandler = (_: any, _data: string): void => {
  void store.dispatch(clearState())
}

export const registerClearingUpdateStateOnDeviceAttachedListener =
  (): (() => void) => {
    ipcRenderer.on(ListenerEvent.DeviceAttached, deviceDetachedHandler)

    return () => {
      ipcRenderer.off(ListenerEvent.DeviceAttached, deviceDetachedHandler)
    }
  }
