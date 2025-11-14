/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import { IpcMain } from "electron"
import { AppMtpIpcEvents, MtpTransferFileData } from "app-mtp/models"
import { TransferFilesActionType } from "devices/common/models"
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
  ipcMain.removeHandler(AppMtpIpcEvents.GetDeviceStorages)
  ipcMain.handle(
    AppMtpIpcEvents.GetDeviceStorages,
    async (_, deviceId: string) => {
      return appMtp.getDeviceStorages(deviceId)
    }
  )
  ipcMain.removeHandler(AppMtpIpcEvents.StartTransferFile)
  ipcMain.handle(
    AppMtpIpcEvents.StartTransferFile,
    async (
      _,
      {
        action,
        ...data
      }: MtpTransferFileData & { action: TransferFilesActionType }
    ) => {
      if (action === TransferFilesActionType.Upload) {
        return appMtp.uploadFile(data)
      } else {
        return appMtp.exportFile(data)
      }
    }
  )
  ipcMain.removeHandler(AppMtpIpcEvents.GetTransferredFileProgress)
  ipcMain.handle(
    AppMtpIpcEvents.GetTransferredFileProgress,
    async (_, transactionId: string) => {
      return appMtp.getTransferredFileProgress({
        transactionId,
      })
    }
  )
  ipcMain.removeHandler(AppMtpIpcEvents.CancelFileTransfer)
  ipcMain.handle(
    AppMtpIpcEvents.CancelFileTransfer,
    async (_, transactionId: string) => {
      return appMtp.cancelFileTransfer({
        transactionId,
      })
    }
  )
}
