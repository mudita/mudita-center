/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  AppMtp,
  CancelUploadFileResultData,
  GetUploadFileProgressResultData,
  MTPError,
  MtpStorage,
  MtpUploadFileData,
  UploadFileResultData,
} from "app-mtp"
import {
  ApiFileTransferError,
  MtpFileTransferServiceEvents,
} from "device/models"
import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { mapToCoreUsbId } from "./map-to-core-usb-id"
import { AppError } from "Core/core/errors"

export class MtpFileTransferService {
  constructor(private mtp: AppMtp) {}

  @IpcEvent(MtpFileTransferServiceEvents.GetMtpDeviceId)
  async getMtpDeviceId(portInfo: PortInfo): Promise<string | undefined> {
    const devices = await this.mtp.getDevices()
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

  @IpcEvent(MtpFileTransferServiceEvents.GetDeviceStorages)
  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    const result = await this.mtp.getDeviceStorages(deviceId)
    return this.mapToApiFileTransferErrorResult(result)
  }

  @IpcEvent(MtpFileTransferServiceEvents.StartSendFile)
  async startSendFile({
    deviceId,
    storageId,
    sourcePath,
    destinationPath,
  }: MtpUploadFileData): Promise<ResultObject<UploadFileResultData>> {
    const result = await this.mtp.uploadFile({
      deviceId,
      storageId,
      sourcePath,
      destinationPath,
    })
    return this.mapToApiFileTransferErrorResult(result)
  }

  @IpcEvent(MtpFileTransferServiceEvents.GetSendFileProgress)
  async getSendFileProgress(
    transactionId: string
  ): Promise<ResultObject<GetUploadFileProgressResultData>> {
    const result = await this.mtp.getUploadFileProgress({
      transactionId,
    })
    return this.mapToApiFileTransferErrorResult(result)
  }

  @IpcEvent(MtpFileTransferServiceEvents.CancelSendFile)
  async cancelSendFile(
    transactionId: string
  ): Promise<ResultObject<CancelUploadFileResultData>> {
    const result = await this.mtp.cancelUpload({
      transactionId,
    })
    return this.mapToApiFileTransferErrorResult(result)
  }

  private mapToApiFileTransferErrorResult<T>(
    result: ResultObject<T>
  ): ResultObject<T, ApiFileTransferError> {
    if (result.ok) {
      return result
    }

    const errorType =
      result.error.type === MTPError.MTP_INITIALIZE_ACCESS_ERROR
        ? ApiFileTransferError.MtpInitializeAccessError
        : ApiFileTransferError.Unknown

    const apiError: AppError<ApiFileTransferError> = {
      type: errorType,
      message: result.error.message,
      name: "",
    }

    return {
      ...result,
      error: apiError,
    }
  }
}
