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
import { AppSerialPortService } from "./app-serial-port-service"

let serialport: AppSerialPortService

export const initSerialPort = (ipcMain: IpcMain, mainWindow: BrowserWindow) => {
  if (serialport) {
    const changedDevices: SerialPortChangedDevices = {
      added: [],
      removed: [],
      all: serialport.getCurrentDevices(),
    }
    const emitDevicesChanged = () => {
      mainWindow.webContents.send(
        SerialPortIpcEvents.DevicesChanged,
        changedDevices
      )
    }
    mainWindow.webContents.once("did-finish-load", emitDevicesChanged)
  } else {
    serialport = new AppSerialPortService()
    serialport.onDevicesChanged((data) => {
      mainWindow.webContents.send(SerialPortIpcEvents.DevicesChanged, data)
    })
    ipcMain.removeHandler(SerialPortIpcEvents.GetCurrentDevices)
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
    ipcMain.removeHandler(SerialPortIpcEvents.Freeze)
    ipcMain.handle(
      SerialPortIpcEvents.Freeze,
      (_, path: string, timeout?: number) => {
        return serialport.freeze(path, timeout)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.Unfreeze)
    ipcMain.handle(SerialPortIpcEvents.Unfreeze, (_, path: string) => {
      return serialport.unfreeze(path)
    })
    ipcMain.removeHandler(SerialPortIpcEvents.IsFrozen)
    ipcMain.handle(SerialPortIpcEvents.IsFrozen, (_, path: string) => {
      return serialport.isFrozen(path)
    })
  }
}
