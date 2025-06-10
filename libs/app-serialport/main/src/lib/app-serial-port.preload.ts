/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { electronAPI } from "@electron-toolkit/preload"

export const serialPort = {
  onDevicesChanged: (callback: (devices: SerialPortChangedDevices) => void) => {
    electronAPI.ipcRenderer.on(
      SerialPortIpcEvents.DevicesChanged,
      (_, data) => {
        callback(data)
      }
    )
  },
  getCurrentDevices: () => {
    return electronAPI.ipcRenderer.invoke(SerialPortIpcEvents.GetCurrentDevices)
  },
  request: (path: string, data: SerialPortRequest) => {
    return electronAPI.ipcRenderer.invoke(
      SerialPortIpcEvents.Request,
      path,
      data
    )
  },
  changeBaudRate: (path: string, baudRate: number) => {
    return electronAPI.ipcRenderer.invoke(
      SerialPortIpcEvents.ChangeBaudRate,
      path,
      baudRate
    )
  },
}
