/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  AppMtp,
  GetUploadFileProgressResultData,
  MtpStorage,
  UploadFileResultData,
} from "app-mtp"
import { MtpFileTransferServiceEvents } from "device/models"
import { IpcEvent } from "Core/core/decorators"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"

export interface StartSendFilePayload {
  sourcePath: string
  destinationPath: string
  isInternal: boolean
  portInfo: PortInfo
}

export class MtpFileTransferService {
  constructor(private mtp: AppMtp) {}

  @IpcEvent(MtpFileTransferServiceEvents.StartSendFile)
  async startSendFile({
    portInfo,
    isInternal,
    sourcePath,
    destinationPath,
  }: StartSendFilePayload): Promise<ResultObject<UploadFileResultData>> {
    const deviceId = await this.getMtpDeviceId(portInfo)

    if (!deviceId) {
      return Result.failed(new AppError(""))
    }

    const storages = await this.getDeviceStorages(deviceId)
    const storageId = storages.find((s) => s.isInternal === isInternal)?.id

    if (!storageId) {
      return Result.failed(new AppError(""))
    }

    return this.mtp.uploadFile({
      deviceId,
      storageId,
      sourcePath,
      destinationPath,
    })
  }

  @IpcEvent(MtpFileTransferServiceEvents.GetSendFileProgress)
  async getSendFileProgress(
    transactionId: string
  ): Promise<ResultObject<GetUploadFileProgressResultData>> {
    return this.mtp.getUploadFileProgress({
      transactionId,
    })
  }

  private async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    const result = await this.mtp.getDeviceStorages(deviceId)

    return result.ok ? result.data : []
  }

  private async getMtpDeviceId(
    portInfo: PortInfo
  ): Promise<string | undefined> {
    const mtpDeviceId = this.mapToMtpDeviceId(portInfo)

    if (!mtpDeviceId) {
      return undefined
    }

    const devices = await this.mtp.getDevices()
    return devices.find((device) => device.id.includes(mtpDeviceId))?.id
  }

  private mapToMtpDeviceId(portInfo: PortInfo): string | undefined {
    switch (process.platform) {
      case "darwin":
      case "linux":
        return portInfo.serialNumber
      case "win32":
        return portInfo.pnpId
      default:
        throw new Error(`Unsupported platform: ${process.platform}`)
    }
  }
}
