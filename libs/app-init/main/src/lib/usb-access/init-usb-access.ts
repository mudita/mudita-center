/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { UsbAccessIpcEvents } from "app-init/models"
import { UsbAccessService } from "./usb-access.service"

export const initUsbAccess = (ipcMain: IpcMain) => {
  ipcMain.removeHandler(UsbAccessIpcEvents.HasSerialPortAccess)
  ipcMain.handle(UsbAccessIpcEvents.HasSerialPortAccess, () =>
    UsbAccessService.hasSerialPortAccess()
  )

  ipcMain.removeHandler(UsbAccessIpcEvents.GrantAccessToSerialPort)
  ipcMain.handle(UsbAccessIpcEvents.GrantAccessToSerialPort, () =>
    UsbAccessService.grantAccessToSerialPort()
  )
}
