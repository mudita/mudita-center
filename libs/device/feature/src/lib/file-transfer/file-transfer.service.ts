/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject, SuccessResult } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError, AppErrorType } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceId } from "Core/device/constants/device-id"
import {
  ApiFileTransferError,
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
  filePath: string
  chunks: string[]
}

const DEFAULT_MAX_REPEATS = 0

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

      if (!success) {
        return handleError(response.data.status)
      }

      this.transfers[preTransferResponse.data.transferId] = {
        crc32,
        fileSize: file.length,
        filePath,
        chunks:
          file.match(
            new RegExp(`.{1,${preTransferResponse.data.chunkSize}}`, "g")
          ) || [],
      }

      return Result.success({
        transferId: preTransferResponse.data.transferId,
        chunksCount:
          this.transfers[preTransferResponse.data.transferId].chunks.length,
      })
    }

    return handleError(response.error.type)
  }

  @IpcEvent(ApiFileTransferServiceEvents.Send)
  public async transferSend({
    transferId,
    chunkNumber,
    deviceId,
    repeats = 0,
    maxRepeats = DEFAULT_MAX_REPEATS,
  }: {
    transferId: number
    chunkNumber: number
    deviceId?: DeviceId
    repeats: number
    maxRepeats: number
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
      if (repeats < maxRepeats) {
        return this.transferSend({
          transferId,
          chunkNumber,
          deviceId,
          repeats: repeats + 1,
          maxRepeats,
        })
      } else {
        return handleError(response.error.type)
      }
    }

    const transferResponse = TransferSendValidator.safeParse(response.data.body)

    const success =
      transferResponse.success && [200, 206].includes(response.data.status)

    if (!success) {
      return handleError(response.data.status)
    }

    return Result.success(transferResponse.data as TransferSend)
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

const handleError = (responseStatus: AppErrorType) => {
  if (ApiFileTransferError[responseStatus as ApiFileTransferError]) {
    return Result.failed<
      { transferId?: number; filePath: string },
      AppErrorType
    >(
      new AppError(
        responseStatus,
        ApiFileTransferError[responseStatus as ApiFileTransferError]
      )
    )
  } else {
    return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
  }
}
