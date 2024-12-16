/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialportIpcEvents } from "app-serialport/models"

export const AppSerialPort = {
  list: () => {
    return window.electron.ipcRenderer.invoke(SerialportIpcEvents.List)
  },
  write: (path: string, data: string) => {
    return window.electron.ipcRenderer.invoke(
      SerialportIpcEvents.Write,
      path,
      data
    )
  },
}
