/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import { IpcMain } from "electron"
import { AppMtpIpcEvents } from "app-mtp/models"
import { mapToCoreUsbId } from "app-utils/common"
import { AppMtp } from "./app-mtp"

export const initAppMtp = (ipcMain: IpcMain, appMtp: AppMtp) => {
  ipcMain.removeHandler(AppMtpIpcEvents.GetMtpDeviceId)
  ipcMain.handle(
    AppMtpIpcEvents.GetMtpDeviceId,
    async (_, portInfo: Partial<PortInfo>) => {
      if (!portInfo.serialNumber && !portInfo.pnpId) {
        return undefined
      }
      const devices = await appMtp.getDevices()
      const device = devices.find((device) => {
        switch (process.platform) {
          case "darwin":
          case "linux":
            return portInfo.serialNumber === device.id
          case "win32":
            return (
              mapToCoreUsbId(portInfo.pnpId ?? "", "\\") ===
              mapToCoreUsbId(device.id)
            )
          default:
            throw new Error(`Unsupported platform: ${process.platform}`)
        }
      })
      return device?.id
    }
  )
}
