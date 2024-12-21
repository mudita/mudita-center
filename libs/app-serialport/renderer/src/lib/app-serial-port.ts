/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  APIRequestData,
  SerialPortChangedDevices,
  SerialPortIpcEvents,
} from "app-serialport/models"

export const AppSerialPort = {
  onDevicesChanged: (callback: (changes: SerialPortChangedDevices) => void) => {
    return window.electron.ipcRenderer.on(
      SerialPortIpcEvents.DevicesChanged,
      (_, changes) => {
        callback(changes)
      }
    )
  },
  request: (path: string, data: APIRequestData) => {
    return window.electron.ipcRenderer.invoke(
      SerialPortIpcEvents.Request,
      path,
      data
    )
  },
}
