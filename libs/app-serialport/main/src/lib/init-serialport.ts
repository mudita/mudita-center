/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, IpcMain, WebContents } from "electron"
import {
  SerialPortChangedDevices,
  SerialPortDeviceId,
  SerialPortIpcEvents,
  SerialPortRequest,
} from "app-serialport/models"
import { AppSerialPortService } from "./app-serial-port-service"

interface MainWindowBinding {
  window: BrowserWindow
  release: VoidFunction
}

let serialport: AppSerialPortService | undefined
let currentBinding: MainWindowBinding | undefined

const sendDevicesChanged = (
  webContents: WebContents,
  changedDevices: SerialPortChangedDevices
) => {
  if (webContents.isDestroyed()) {
    return
  }
  webContents.send(SerialPortIpcEvents.DevicesChanged, changedDevices)
}

const releaseCurrentBinding = () => {
  currentBinding?.release()
  currentBinding = undefined
}

/**
 * Points the live device-change subscription at `mainWindow`, releasing the
 * previous binding first.
 *
 * On macOS the app outlives its window: `window-all-closed` does not quit, and
 * clicking the dock icon runs `createWindow` again with a brand new
 * BrowserWindow. Without rebinding, every push would keep going to the
 * webContents of the destroyed window and the new renderer would never learn
 * that a device was plugged in or unplugged.
 */
const bindMainWindow = (
  service: AppSerialPortService,
  mainWindow: BrowserWindow
) => {
  releaseCurrentBinding()

  // Captured once so that releasing the binding never touches a destroyed
  // BrowserWindow to get at its webContents.
  const { webContents } = mainWindow

  const unsubscribeDevicesChanged = service.onDevicesChanged(
    (changedDevices) => {
      sendDevicesChanged(webContents, changedDevices)
    }
  )

  // A load gives the renderer an empty device list, so it needs the current one
  // pushed to it - in the same shape the subscription above sends, otherwise
  // the first list would also contain devices that are initializing or gone.
  const sendCurrentDevices = () => {
    sendDevicesChanged(webContents, {
      added: [],
      removed: [],
      all: service.getVisibleDevices(),
    })
  }
  webContents.on("did-finish-load", sendCurrentDevices)

  const onWindowClosed = () => {
    if (currentBinding?.window === mainWindow) {
      releaseCurrentBinding()
    }
  }
  mainWindow.once("closed", onWindowClosed)

  currentBinding = {
    window: mainWindow,
    release: () => {
      unsubscribeDevicesChanged()
      mainWindow.removeListener("closed", onWindowClosed)
      if (!webContents.isDestroyed()) {
        webContents.removeListener("did-finish-load", sendCurrentDevices)
      }
    },
  }
}

const registerIpcHandlers = (
  ipcMain: IpcMain,
  service: AppSerialPortService
) => {
  ipcMain.removeHandler(SerialPortIpcEvents.GetCurrentDevices)
  ipcMain.handle(SerialPortIpcEvents.GetCurrentDevices, () => {
    return service.getCurrentDevices().map((device) => device.info)
  })
  ipcMain.removeHandler(SerialPortIpcEvents.Request)
  ipcMain.handle(
    SerialPortIpcEvents.Request,
    (_, id: SerialPortDeviceId, data: SerialPortRequest) => {
      return service.request(id, data)
    }
  )
  ipcMain.removeHandler(SerialPortIpcEvents.Freeze)
  ipcMain.handle(
    SerialPortIpcEvents.Freeze,
    (_, id: SerialPortDeviceId, duration?: number) => {
      return service.freeze(id, duration)
    }
  )
  ipcMain.removeHandler(SerialPortIpcEvents.Unfreeze)
  ipcMain.handle(SerialPortIpcEvents.Unfreeze, (_, id: SerialPortDeviceId) => {
    return service.unfreeze(id)
  })
  ipcMain.removeHandler(SerialPortIpcEvents.IsFrozen)
  ipcMain.handle(SerialPortIpcEvents.IsFrozen, (_, id: SerialPortDeviceId) => {
    return service.isFrozen(id)
  })
  ipcMain.removeHandler(SerialPortIpcEvents.Reset)
  ipcMain.handle(SerialPortIpcEvents.Reset, (_, id?: SerialPortDeviceId) => {
    return service.reset(id)
  })
}

export const initSerialPort = (ipcMain: IpcMain, mainWindow: BrowserWindow) => {
  if (!serialport) {
    serialport = new AppSerialPortService()
    // The handlers only reach the service, never the window, so registering
    // them once is enough no matter how many windows come and go.
    registerIpcHandlers(ipcMain, serialport)
  }

  bindMainWindow(serialport, mainWindow)
}
