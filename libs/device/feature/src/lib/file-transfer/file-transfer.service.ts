/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError, AppErrorType } from "Core/core/errors"
import { DeviceManager } from "Core/device-manager/services"
import { DeviceId } from "Core/device/constants/device-id"
import {
  ApiFileTransferError,
  ApiFileTransferServiceEvents,
  FileTransferStatuses,
  GeneralError,
  PreTransferGet,
  PreTransferGetValidator,
  PreTransferSendValidator,
  TransferGetValidator,
  TransferSend,
  TransferSendValidator,
} from "device/models"
import { readFileSync } from "fs-extra"
import crc from "js-crc"

const file =
  "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"

interface Transfer {
  crc32: string
  fileSize: number
  filePath: string
  chunks: string[]
}

const DEFAULT_MAX_REPEATS = 2

export class APIFileTransferService {
  constructor(
    private deviceManager: DeviceManager,
    private transfers: Record<string, Transfer> = {}
  ) {
    this.transfers["123"] = {
      chunks: [file],
      crc32: "123",
      fileSize: 123,
    }
  }

  private prepareFile(path: string) {
    const file = readFileSync(path, {
      encoding: "base64",
    })
    return {
      file,
      crc32: crc.crc32(file),
    }
  }

  public getFileByTransferId(transferId: string) {
    return this.transfers[transferId]
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
          deviceId,
          transferId,
          chunkNumber,
          repeats: repeats + 1,
          maxRepeats,
        })
      } else {
        return handleError(response.error.type)
      }
    }

    const transferResponse = TransferSendValidator.safeParse(response.data.body)

    const success =
      transferResponse.success &&
      [
        FileTransferStatuses.WholeFileTransferred,
        FileTransferStatuses.FileChunkTransferred,
      ].includes(response.data.status as number)

    if (!success) {
      return handleError(response.data.status)
    }

    return Result.success(transferResponse.data)
  }

  private validateChecksum(transferId: number) {
    const transfer = this.transfers[transferId]
    const data = transfer.chunks.join("")
    const crc32 = crc.crc32(data)
    return crc32.toLowerCase() === transfer.crc32.toLowerCase()
  }

  @IpcEvent(ApiFileTransferServiceEvents.PreGet)
  public async preTransferGet({
    filePath,
    deviceId,
  }: {
    filePath: string
    deviceId?: DeviceId
  }): Promise<ResultObject<PreTransferGet>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      body: {
        filePath,
      },
    })

    if (response.ok) {
      const preTransferResponse = PreTransferGetValidator.safeParse(
        response.data.body
      )

      const success = preTransferResponse.success

      if (!success) {
        return handleError(response.data.status)
      }

      this.transfers[preTransferResponse.data.transferId] = {
        crc32: preTransferResponse.data.crc32,
        fileSize: preTransferResponse.data.fileSize,
        filePath,
        chunks: [],
      }

      return Result.success(preTransferResponse.data)
    }

    return handleError(response.error.type)
  }

  @IpcEvent(ApiFileTransferServiceEvents.Get)
  public async transferGet({
    deviceId,
    transferId,
    chunkNumber,
    repeats = 0,
    maxRepeats = DEFAULT_MAX_REPEATS,
  }: {
    deviceId?: DeviceId
    transferId: number
    chunkNumber: number
    repeats: number
    maxRepeats: number
  }): Promise<ResultObject<undefined>> {
    const device = deviceId
      ? this.deviceManager.getAPIDeviceById(deviceId)
      : this.deviceManager.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "FILE_TRANSFER",
      method: "GET",
      body: {
        transferId,
        chunkNumber,
      },
    })

    if (!response.ok) {
      if (repeats < maxRepeats) {
        return this.transferGet({
          deviceId,
          transferId,
          chunkNumber,
          repeats: repeats + 1,
          maxRepeats,
        })
      } else {
        return handleError(response.error.type)
      }
    }

    const transferResponse = TransferGetValidator.safeParse(response.data.body)

    const success =
      transferResponse.success &&
      [
        FileTransferStatuses.WholeFileTransferred,
        FileTransferStatuses.FileChunkTransferred,
      ].includes(response.data.status as number)

    if (!success) {
      return handleError(response.data.status)
    }

    this.transfers[transferId].chunks[chunkNumber - 1] =
      transferResponse.data.data

    if (
      (response.data.status as number) ===
      FileTransferStatuses.WholeFileTransferred
    ) {
      if (this.validateChecksum(transferId)) {
        return Result.success(undefined)
      } else {
        return Result.failed(
          new AppError(
            ApiFileTransferError.CRCMismatch,
            ApiFileTransferError[ApiFileTransferError.CRCMismatch]
          )
        )
      }
    }

    return Result.success(undefined)
  }

  @IpcEvent(ApiFileTransferServiceEvents.Clear)
  public transferClear({ transferId }: { transferId: number }) {
    delete this.transfers[transferId]
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
