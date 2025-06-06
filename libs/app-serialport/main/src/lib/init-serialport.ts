/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, WebContents } from "electron"
import {
  SerialPortChangedDevices,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { AppSerialPort } from "./app-serial-port"

let serialport: AppSerialPort | null = null

export const initSerialPort = (ipcMain: IpcMain, webContents: WebContents) => {
  if (serialport) {
    const changedDevices: SerialPortChangedDevices = {
      added: serialport.addedDevices,
      removed: serialport.removedDevices,
      all: serialport.currentDevices,
    }
    const emitDevicesChanged = () => {
      webContents.send(SerialPortIpcEvents.DevicesChanged, changedDevices)
    }
    webContents.once("did-finish-load", emitDevicesChanged)
  } else {
    serialport = new AppSerialPort()
    serialport.onDevicesChange((data) => {
      webContents.send(SerialPortIpcEvents.DevicesChanged, data)
    })
    ipcMain.handle(SerialPortIpcEvents.GetCurrentDevices, () => {
      return (serialport as AppSerialPort).getCurrentDevices()
    })
    ipcMain.removeHandler(SerialPortIpcEvents.Request)
    ipcMain.handle(
      SerialPortIpcEvents.Request,
      (_, path: string, data: SerialPortRequest) => {
        return (serialport as AppSerialPort).request(path, data)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.ChangeBaudRate)
    ipcMain.handle(
      SerialPortIpcEvents.ChangeBaudRate,
      (_, path: string, baudRate: number) => {
        return (serialport as AppSerialPort).changeBaudRate(path, baudRate)
      }
    )
  }
}
