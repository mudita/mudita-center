/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { PortInfo } from "@serialport/bindings-interface"
import { AppResult } from "app-utils/models"
import {
  AppMtpIpcEvents,
  CancelTransferResultData,
  GetTransferFileProgressResultData,
  MtpStorage,
  MtpTransferFileData,
  TransferFileResultData,
} from "app-mtp/models"

export const appMtp = {
  getMtpDeviceId: (
    portInfo: Partial<PortInfo>
  ): Promise<string | undefined> => {
    return electronAPI.ipcRenderer.invoke(
      AppMtpIpcEvents.GetMtpDeviceId,
      portInfo
    )
  },
  getDeviceStorages: (deviceId: string): Promise<AppResult<MtpStorage[]>> => {
    return electronAPI.ipcRenderer.invoke(
      AppMtpIpcEvents.GetDeviceStorages,
      deviceId
    )
  },
  startTransferFile: (
    data: MtpTransferFileData
  ): Promise<AppResult<TransferFileResultData>> => {
    return electronAPI.ipcRenderer.invoke(
      AppMtpIpcEvents.StartTransferFile,
      data
    )
  },
  getTransferredFileProgress: (
    transactionId: string
  ): Promise<AppResult<GetTransferFileProgressResultData>> => {
    return electronAPI.ipcRenderer.invoke(
      AppMtpIpcEvents.GetTransferredFileProgress,
      transactionId
    )
  },
  cancelFileTransfer: (
    transactionId: string
  ): Promise<AppResult<CancelTransferResultData>> => {
    return electronAPI.ipcRenderer.invoke(
      AppMtpIpcEvents.CancelFileTransfer,
      transactionId
    )
  },
}
