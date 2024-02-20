/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject, SuccessResult } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceId } from "Core/device/constants/device-id"
import {
  ApiFileTransferServiceEvents,
  GeneralError,
  PreTransferSendValidator,
  TransferSend,
  TransferSendValidator,
} from "device/models"
import { readFileSync } from "fs-extra"
import crc from "js-crc"

interface Transfer {
  crc32: string
  fileSize: number
  chunks: string[]
}

export class APIFileTransferService {
  constructor(
    private deviceManager: DeviceManager,
    private transfers: Record<string, Transfer> = {}
  ) {}

  private prepareFile(path: string) {
    const file = readFileSync(path, {
      encoding: "base64",
    })
    return {
      file,
      crc32: crc.crc32(file),
    }
  }

  // Sending files to device
  @IpcEvent(ApiFileTransferServiceEvents.PreSend)
  public async preTransferSend({
    filePath,
    targetPath,
    deviceId,
  }: {
    filePath: string
    targetPath: string
    deviceId?: DeviceId
  }): Promise<
    ResultObject<{
      transferId: number
      chunksCount: number
    }>
  > {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }
    const { crc32, file } = this.prepareFile(filePath)

    const response = await device.request({
      endpoint: "PRE_FILE_TRANSFER",
      method: "POST",
      body: {
        filePath: targetPath,
        fileSize: file.length,
        crc32,
      },
    })

    if (response.ok) {
      const preTransferResponse = PreTransferSendValidator.safeParse(
        response.data.body
      )

      const success = preTransferResponse.success

      if (success) {
        this.transfers[preTransferResponse.data.transferId] = {
          crc32,
          fileSize: file.length,
          chunks:
            file.match(
              new RegExp(`.{1,${preTransferResponse.data.chunkSize}}`, "g")
            ) || [],
        }
      }

      return success
        ? Result.success({
            transferId: preTransferResponse.data.transferId,
            chunksCount:
              this.transfers[preTransferResponse.data.transferId].chunks.length,
          })
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(response.error)
  }

  @IpcEvent(ApiFileTransferServiceEvents.Send)
  public async transferSend({
    transferId,
    chunkNumber,
    deviceId,
  }: {
    transferId: number
    chunkNumber: number
    deviceId?: DeviceId
  }): Promise<ResultObject<TransferSend>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const data = this.transfers[transferId].chunks[chunkNumber - 1]

    const response = await device.request({
      endpoint: "FILE_TRANSFER",
      method: "POST",
      body: {
        transferId,
        chunkNumber,
        data,
      },
    })

    if (!response.ok) {
      return Result.failed(response.error)
    }

    const transferResponse = TransferSendValidator.safeParse(response.data.body)

    const success =
      transferResponse.success && [200, 206].includes(response.data.status)

    return success
      ? Result.success(transferResponse.data as TransferSend)
      : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
  }

  @IpcEvent(ApiFileTransferServiceEvents.SendClear)
  public async transferSendClear({
    transferId,
  }: {
    transferId: number
  }): Promise<ResultObject<true>> {
    delete this.transfers[transferId]
    return Result.success(true) as SuccessResult<true>
  }
}
