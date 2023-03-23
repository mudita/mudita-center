/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {ipcRenderer} from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import {ListenerEvent} from "App/device-manager/constants"
import {connectDevice} from "App/device/actions"
//import { DeviceType } from "App/device/modules/device"
import {DeviceType,} from "App/device/constants"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const currentDeviceChangedHandler = (_: any, deviceType: string): void => {
  console.log("[ps] renderer currentDeviceChangedHandler deviceType")
  if (!deviceType) {
    return
  }
  const dt = deviceType === "MuditaHarmony" ? DeviceType.MuditaHarmony : DeviceType.MuditaPure
  void store.dispatch(connectDevice(dt))
}

export const registerCurrentDeviceChangedListener = (): (() => void) => {
  console.log("[ps] renderer registerCurrentDeviceChangedListener")

  ipcRenderer.on(
    ListenerEvent.CurrentDeviceChanged,
    (_: any, deviceType: string): void => {
      console.log("[ps] renderer registerCurrentDeviceChangedListener ipcRenderer.on deviceType", deviceType)
      if (!deviceType) {
        return
      }
      const dt = deviceType === "MuditaHarmony" ? DeviceType.MuditaHarmony : DeviceType.MuditaPure
      void store.dispatch(connectDevice(dt))
    }
  )

  return () => {
    ipcRenderer.off(
      ListenerEvent.CurrentDeviceChanged,
      (_: any, deviceType: string): void => {
        console.log("[ps] renderer registerCurrentDeviceChangedListener ipcRenderer.off deviceType", deviceType)
        if (!deviceType) {
          return
        }
        const dt = deviceType === "MuditaHarmony" ? DeviceType.MuditaHarmony : DeviceType.MuditaPure
        void store.dispatch(connectDevice(dt))
      }
    )
  }
}
