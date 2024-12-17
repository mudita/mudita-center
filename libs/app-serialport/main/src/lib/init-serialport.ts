/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { SerialPort } from "serialport"
import { SerialportIpcEvents } from "app-serialport/models"
import { AppSerialPort } from "./app-serial-port"

export const initSerialPort = (ipcMain: IpcMain) => {
  const serialport = new AppSerialPort()

  ipcMain.handle(SerialportIpcEvents.List, async () => {
    return (await SerialPort.list()).filter((port) => {
      return (
        port.vendorId === "0e8d" &&
        port.productId &&
        ["200a", "2006"].includes(port.productId)
      )
    })
  })
  ipcMain.handle(SerialportIpcEvents.Write, (_, path: string, data: string) => {
    serialport.write(path, data)
  })
}
