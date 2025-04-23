/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetUploadFileProgress,
  GetUploadFileProgressResultData,
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
  UploadFileResultData,
} from "./app-mtp.interface"
import { MtpFactory } from "./app-mtp.factory"
import { ResultObject } from "../../../core/core/builder/result.builder"

export class AppMtp implements MtpInterface {
  private mtp: MtpInterface

  constructor() {
    this.mtp = MtpFactory.createInstance()
  }

  async getDevices(): Promise<MtpDevice[]> {
    console.log(`[app-mtp] getting devices`)
    const result = await this.mtp.getDevices()
    console.log(`[app-mtp] getting devices result: ${JSON.stringify(result)}`)
    return result
  }

  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    console.log(`[app-mtp] getting device storages for device: ${deviceId}`)
    const result = await this.mtp.getDeviceStorages(deviceId)
    console.log(
      `[app-mtp] getting device storages result: ${JSON.stringify(result)}`
    )
    return result
  }

  async uploadFile(
    data: MtpUploadFileData
  ): Promise<ResultObject<UploadFileResultData>> {
    console.log(
      `[app-mtp] starting upload file process for data: ${JSON.stringify(data)}`
    )
    const result = await this.mtp.uploadFile(data)
    console.log(
      `[app-mtp] starting upload file process result: ${JSON.stringify(result)}`
    )
    return result
  }

  async getUploadFileProgress(
    data: GetUploadFileProgress
  ): Promise<ResultObject<GetUploadFileProgressResultData>> {
    console.log(
      `[app-mtp] getting upload file progress for transaction: ${data.transactionId}`
    )
    const result = await this.mtp.getUploadFileProgress(data)

    console.log(
      `[app-mtp] getting upload file progress result: ${JSON.stringify(result)}`
    )

    return result
  }
}
