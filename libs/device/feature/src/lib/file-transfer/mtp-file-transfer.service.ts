/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  AppMtp,
  GetUploadFileProgressResultData,
  MtpStorage,
  MtpUploadFileData,
  UploadFileResultData,
} from "app-mtp"
import { MtpFileTransferServiceEvents } from "device/models"
import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { mapToCoreUsbId } from "./map-to-core-usb-id"

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
    return this.mtp.getDeviceStorages(deviceId)
  }

  @IpcEvent(MtpFileTransferServiceEvents.StartSendFile)
  async startSendFile({
    deviceId,
    storageId,
    sourcePath,
    destinationPath,
  }: MtpUploadFileData): Promise<ResultObject<UploadFileResultData>> {
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
}
