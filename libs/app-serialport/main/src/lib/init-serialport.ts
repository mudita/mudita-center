/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain, BrowserWindow } from "electron"
import {
  SerialPortChangedDevices,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { AppSerialPort } from "./app-serial-port"

let serialport: AppSerialPort

export const initSerialPort = (ipcMain: IpcMain, mainWindow: BrowserWindow) => {
  if (serialport) {
    const changedDevices: SerialPortChangedDevices = {
      added: serialport.addedDevices,
      removed: serialport.removedDevices,
      all: serialport.currentDevices,
    }
    const emitDevicesChanged = () => {
      mainWindow.webContents.send(
        SerialPortIpcEvents.DevicesChanged,
        changedDevices
      )
    }
    mainWindow.webContents.once("did-finish-load", emitDevicesChanged)
  } else {
    serialport = new AppSerialPort()
    serialport.onDevicesChange((data) => {
      mainWindow.webContents.send(SerialPortIpcEvents.DevicesChanged, data)
    })
    ipcMain.handle(SerialPortIpcEvents.GetCurrentDevices, () => {
      return serialport.getCurrentDevices()
    })
    ipcMain.removeHandler(SerialPortIpcEvents.Request)
    ipcMain.handle(
      SerialPortIpcEvents.Request,
      (_, path: string, data: SerialPortRequest) => {
        return serialport.request(path, data)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.ChangeBaudRate)
    ipcMain.handle(
      SerialPortIpcEvents.ChangeBaudRate,
      (_, path: string, baudRate: number) => {
        return serialport.changeBaudRate(path, baudRate)
      }
    )
  }
}
