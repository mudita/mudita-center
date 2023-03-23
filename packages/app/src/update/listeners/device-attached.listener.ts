/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ListenerEvent } from "App/device-manager/constants"
import { handleDeviceAttached } from "App/update/actions"
import store from "App/__deprecated__/renderer/store"
import { ipcRenderer } from "electron-better-ipc"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const deviceAttachedHandler = (_: any, _data: string): void => {
//   void store.dispatch(handleDeviceAttached())
// }

export const registerClearingUpdateStateOnDeviceAttachedListener =
  (): (() => void) => {
    ipcRenderer.on(ListenerEvent.DeviceAttached, (_: any, _data: string): void => {
      console.log("registerClearingUpdateStateOnDeviceAttachedListener ipcRenderer.on")
      void store.dispatch(handleDeviceAttached())
    })

    return () => {
      ipcRenderer.off(ListenerEvent.DeviceAttached, (_: any, _data: string): void => {
        console.log("registerClearingUpdateStateOnDeviceAttachedListener ipcRenderer.off")
        void store.dispatch(handleDeviceAttached())
      })
    }
  }
