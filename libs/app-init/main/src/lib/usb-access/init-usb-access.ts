/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { UsbAccessIpcEvents } from "app-init/models"
import { IpcMockServer } from "e2e-mock/server"
import { UsbAccessService } from "./usb-access.service"
import { MockUsbAccessService } from "./mock-usb-access.service"

let usbAccessService: UsbAccessService | MockUsbAccessService

const shouldUseMockService = (serverEnabled: boolean) => {
  return serverEnabled || process.env.E2ECI === "true"
}

export const initUsbAccess = (ipcMain: IpcMain, mockServer: IpcMockServer) => {
  if (!usbAccessService) {
    const useMockService = shouldUseMockService(mockServer.serverEnabled)
    console.log(
      `Initializing Usb Access Service in ${useMockService ? "mock" : "real"} mode`
    )
    usbAccessService = useMockService
      ? new MockUsbAccessService(mockServer)
      : new UsbAccessService()

    ipcMain.removeHandler(UsbAccessIpcEvents.HasSerialPortAccess)
    ipcMain.handle(UsbAccessIpcEvents.HasSerialPortAccess, () =>
      usbAccessService.hasSerialPortAccess()
    )

    ipcMain.removeHandler(UsbAccessIpcEvents.GrantAccessToSerialPort)
    ipcMain.handle(UsbAccessIpcEvents.GrantAccessToSerialPort, () =>
      usbAccessService.grantAccessToSerialPort()
    )
  }
}
