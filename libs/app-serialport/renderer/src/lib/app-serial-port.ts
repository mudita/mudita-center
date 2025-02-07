/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortDevicePath,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { AppSerialPortErrors } from "./app-serial-port-errors"

export const AppSerialPort = {
  onDevicesChanged: (callback: (changes: SerialPortChangedDevices) => void) => {
    return window.electron.ipcRenderer.on(
      SerialPortIpcEvents.DevicesChanged,
      (_, changes) => {
        callback(changes)
      }
    )
  },
  request: async (path: SerialPortDevicePath, data: SerialPortRequest) => {
    try {
      return await window.electron.ipcRenderer.invoke(
        SerialPortIpcEvents.Request,
        path,
        data
      )
    } catch (error) {
      if (error instanceof Error) {
        for (const AppSerialPortError of Object.values(AppSerialPortErrors)) {
          const predefinedError = new AppSerialPortError(error.message)
          if (predefinedError.parse()) {
            throw predefinedError
          }
        }
        throw error
      }
      throw error
    }
  },
  changeBaudRate: async (path: SerialPortDevicePath, baudRate: number) => {
    return await window.electron.ipcRenderer.invoke(
      SerialPortIpcEvents.ChangeBaudRate,
      path,
      baudRate
    )
  },
}
