/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  APIRequestData,
  ChangedDevices,
  SerialportIpcEvents,
} from "app-serialport/models"

export const AppSerialPort = {
  onChange: (callback: (changes: ChangedDevices) => void) => {
    return window.electron.ipcRenderer.on(
      SerialportIpcEvents.Change,
      (_, changes) => {
        callback(changes)
      }
    )
  },
  write: (path: string, data: APIRequestData) => {
    return window.electron.ipcRenderer.invoke(
      SerialportIpcEvents.Write,
      path,
      data
    )
  },
}
