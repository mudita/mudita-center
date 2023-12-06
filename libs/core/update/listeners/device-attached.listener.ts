/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ListenerEvent } from "Core/device-manager/constants"
import { handleDeviceAttached } from "Core/update/actions"
import store, { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ipcRenderer } from "electron-better-ipc"
import { registerCurrentDeviceChangedListener } from "Core/device-manager/listeners"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deviceAttachedHandler = (_: any, _data: string): void => {
  void store.dispatch(handleDeviceAttached())
  const noCurrentDeviceListenersRegistered = !ipcRenderer.listeners(
    ListenerEvent.CurrentDeviceChanged
  ).length
  const { initializationFailed } = (
    store.getState() as unknown as ReduxRootState
  ).dataSync
  if (noCurrentDeviceListenersRegistered && !initializationFailed) {
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
