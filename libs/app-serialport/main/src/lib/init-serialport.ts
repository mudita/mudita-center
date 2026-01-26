/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, IpcMain } from "electron"
import {
  SerialPortChangedDevices,
  SerialPortDeviceId,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { AppSerialPortService } from "./app-serial-port-service"

let serialport: AppSerialPortService

export const initSerialPort = (ipcMain: IpcMain, mainWindow: BrowserWindow) => {
  if (serialport) {
    const emitDevicesChanged = () => {
      const changedDevices: SerialPortChangedDevices = {
        added: [],
        removed: [],
        all: serialport.getCurrentDevices(),
      }
      mainWindow.webContents.send(
        SerialPortIpcEvents.DevicesChanged,
        changedDevices
      )
    }
    mainWindow.webContents.on("did-finish-load", emitDevicesChanged)
  } else {
    serialport = new AppSerialPortService()
    serialport.onDevicesChanged((data) => {
      mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send(SerialPortIpcEvents.DevicesChanged, data)
      })
      mainWindow.webContents.send(SerialPortIpcEvents.DevicesChanged, data)
    })
    ipcMain.removeHandler(SerialPortIpcEvents.GetCurrentDevices)
    ipcMain.handle(SerialPortIpcEvents.GetCurrentDevices, () => {
      return serialport.getCurrentDevices()
    })
    ipcMain.removeHandler(SerialPortIpcEvents.Request)
    ipcMain.handle(
      SerialPortIpcEvents.Request,
      (_, id: SerialPortDeviceId, data: SerialPortRequest) => {
        return serialport.request(id, data)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.ChangeBaudRate)
    ipcMain.handle(
      SerialPortIpcEvents.ChangeBaudRate,
      (_, id: SerialPortDeviceId, baudRate: number) => {
        return serialport.changeBaudRate(id, baudRate)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.Freeze)
    ipcMain.handle(
      SerialPortIpcEvents.Freeze,
      (_, id: SerialPortDeviceId, duration?: number) => {
        return serialport.freeze(id, duration)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.Unfreeze)
    ipcMain.handle(
      SerialPortIpcEvents.Unfreeze,
      (_, id: SerialPortDeviceId) => {
        return serialport.unfreeze(id)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.IsFrozen)
    ipcMain.handle(
      SerialPortIpcEvents.IsFrozen,
      (_, id: SerialPortDeviceId) => {
        return serialport.isFrozen(id)
      }
    )
    ipcMain.removeHandler(SerialPortIpcEvents.Reset)
    ipcMain.handle(SerialPortIpcEvents.Reset, (_, id?: SerialPortDeviceId) => {
      return serialport.reset(id)
    })
  }
}
