/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortDeviceId,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { electronAPI } from "@electron-toolkit/preload"

export const serialPort = {
  onDevicesChanged: (callback: (devices: SerialPortChangedDevices) => void) => {
    return electronAPI.ipcRenderer.on(
      SerialPortIpcEvents.DevicesChanged,
      (_, data) => {
        callback(data)
      }
    )
  },
  getCurrentDevices: () => {
    return electronAPI.ipcRenderer.invoke(SerialPortIpcEvents.GetCurrentDevices)
  },
  request: (id: string, data: SerialPortRequest) => {
    return electronAPI.ipcRenderer.invoke(SerialPortIpcEvents.Request, id, data)
  },
  freeze: (id: SerialPortDeviceId, duration?: number) => {
    return electronAPI.ipcRenderer.invoke(
      SerialPortIpcEvents.Freeze,
      id,
      duration
    )
  },
  unfreeze: (id: SerialPortDeviceId) => {
    return electronAPI.ipcRenderer.invoke(SerialPortIpcEvents.Unfreeze, id)
  },
  isFrozen: (id: SerialPortDeviceId): Promise<boolean> => {
    return electronAPI.ipcRenderer.invoke(SerialPortIpcEvents.IsFrozen, id)
  },
  reset: (id?: SerialPortDeviceId) => {
    return electronAPI.ipcRenderer.invoke(SerialPortIpcEvents.Reset, id)
  },
}
