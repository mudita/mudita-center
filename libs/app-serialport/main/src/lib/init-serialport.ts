/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, WebContents } from "electron"
import { APIRequestData, SerialPortIpcEvents } from "app-serialport/models"
import { AppSerialPort } from "./app-serial-port"

let serialport: AppSerialPort | null = null

export const initSerialPort = (ipcMain: IpcMain, webContents: WebContents) => {
  if (!serialport) {
    serialport = new AppSerialPort()

    if (serialport) {
      serialport.onDevicesChange((data) => {
        webContents.send(SerialPortIpcEvents.DevicesChanged, data)
      })
      ipcMain.removeHandler(SerialPortIpcEvents.Request)
      ipcMain.handle(
        SerialPortIpcEvents.Request,
        (_, path: string, data: APIRequestData) => {
          return (serialport as AppSerialPort).request(path, data)
        }
      )
    }
  }
}
