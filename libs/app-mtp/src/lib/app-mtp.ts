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

export class AppMtp {
  private mtp: MtpInterface

  constructor() {
    this.mtp = MtpFactory.createInstance()
  }

  async getDevices(): Promise<MtpDevice[]> {
    return this.mtp.getDevices()
  }

  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    return this.mtp.getDeviceStorages(deviceId)
  }

  async uploadFile(
    data: MtpUploadFileData
  ): Promise<ResultObject<UploadFileResultData>> {
    return this.mtp.uploadFile(data)
  }

  async getUploadFileProgress(
    data: GetUploadFileProgress
  ): Promise<ResultObject<GetUploadFileProgressResultData>> {
    return this.mtp.getUploadFileProgress(data)
  }
}
