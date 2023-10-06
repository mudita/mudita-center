/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ListenerEvent } from "App/device-manager/constants"
import { handleDeviceAttached } from "App/update/actions"
import store, { ReduxRootState } from "App/__deprecated__/renderer/store"
import { ipcRenderer } from "electron-better-ipc"
import { registerCurrentDeviceChangedListener } from "App/device-manager/listeners"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceAttachedHandler = (_: any, _data: string): void => {
  void store.dispatch(handleDeviceAttached())
  if (
    !ipcRenderer.listeners(ListenerEvent.CurrentDeviceChanged).length &&
    !(store.getState() as unknown as ReduxRootState).dataSync
      .initializationFailed
  ) {
    registerCurrentDeviceChangedListener()
  }
}

export const registerClearingUpdateStateOnDeviceAttachedListener =
  (): (() => void) => {
    ipcRenderer.on(ListenerEvent.DeviceAttached, deviceAttachedHandler)

    return () => {
      ipcRenderer.off(ListenerEvent.DeviceAttached, deviceAttachedHandler)
    }
  }
