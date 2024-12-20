/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, WebContents } from "electron"
import { APIRequestData, SerialportIpcEvents } from "app-serialport/models"
import { AppSerialPort } from "./app-serial-port"

export const initSerialPort = (ipcMain: IpcMain, webContents: WebContents) => {
  const serialport = new AppSerialPort()

  serialport.onDevicesChange((data) => {
    webContents.send(SerialportIpcEvents.Change, data)
  })
  ipcMain.handle(
    SerialportIpcEvents.Write,
    (_, path: string, data: APIRequestData) => {
      return serialport.request(path, data)
    }
  )
}
