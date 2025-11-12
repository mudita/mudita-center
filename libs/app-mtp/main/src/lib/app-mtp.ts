/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CancelTransferResultData,
  TransferTransactionData,
  GetTransferFileProgressResultData,
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpTransferFileData,
  TransferFileResultData,
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
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>> {
    console.log(
      `[app-mtp] starting upload file process for data: ${JSON.stringify(data)}`
    )
    const result = await this.mtp.uploadFile(data)
    console.log(
      `[app-mtp] starting upload file process result: ${JSON.stringify(result)}`
    )
    return result
  }

  async exportFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>> {
    console.log(
      `[app-mtp] starting export file process for data: ${JSON.stringify(data)}`
    )
    const result = await this.mtp.exportFile(data)
    console.log(
      `[app-mtp] starting export file process result: ${JSON.stringify(result)}`
    )
    return result
  }

  async getTransferredFileProgress(
    data: TransferTransactionData
  ): Promise<ResultObject<GetTransferFileProgressResultData>> {
    console.log(
      `[app-mtp] getting file transfer progress for transaction: ${data.transactionId}`
    )
    const result = await this.mtp.getTransferredFileProgress(data)

    console.log(
      `[app-mtp] getting file transfer progress result: ${JSON.stringify(
        result
      )}`
    )

    return result
  }

  async cancelFileTransfer(
    data: TransferTransactionData
  ): Promise<ResultObject<CancelTransferResultData>> {
    const result = await this.mtp.cancelFileTransfer(data)
    console.log(`[app-mtp] canceling status: ${JSON.stringify(result)}`)
    return result
  }
}
