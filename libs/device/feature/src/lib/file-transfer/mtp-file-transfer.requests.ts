/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { ipcRenderer } from "electron-better-ipc"
import {
  CancelUploadFileResultData,
  GetUploadFileProgressResultData,
  MtpStorage,
  MtpUploadFileData,
  UploadFileResultData,
} from "app-mtp"
import {
  ApiFileTransferError,
  MtpFileTransferServiceEvents,
} from "device/models"
import { ResultObject } from "Core/core/builder"

export const startSendFileViaMtpRequest = (
  payload: MtpUploadFileData
): Promise<ResultObject<UploadFileResultData, ApiFileTransferError>> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.StartSendFile,
    payload
  )
}
export const getSendFileProgressViaMtpRequest = (
  transactionId: string
): Promise<
  ResultObject<GetUploadFileProgressResultData, ApiFileTransferError>
> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.GetSendFileProgress,
    transactionId
  )
}

export const cancelSendFileViaMtpRequest = (
  transactionId: string
): Promise<ResultObject<CancelUploadFileResultData, ApiFileTransferError>> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.CancelSendFile,
    transactionId
  )
}

export const getMtpDeviceIdRequest = (
  portInfo: PortInfo
): Promise<string | undefined> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.GetMtpDeviceId,
    portInfo
  )
}

export const getDeviceStoragesRequest = (
  deviceId: string
): Promise<ResultObject<MtpStorage[], ApiFileTransferError>> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.GetDeviceStorages,
    deviceId
  )
}
