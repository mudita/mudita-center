/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError, AppErrorType } from "Core/core/errors"
import { DeviceProtocolService } from "device-protocol/feature"
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
import { APIDevice } from "../api-device"
import { ServiceBridge } from "../service-bridge"
import AES from "crypto-js/aes"
import encUtf8 from "crypto-js/enc-utf8"

interface Transfer {
  crc32: string
  fileSize: number
  filePath: string
  chunks: string[]
}

const DEFAULT_MAX_REPEATS = 2

export class APIFileTransferService {
  constructor(
    private deviceManager: DeviceProtocolService,
    private serviceBridge: ServiceBridge,
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

  public getFileByTransferId(transferId: number) {
    return this.transfers[transferId]
  }

  private async preTransferSendRequest(
    device: APIDevice,
    targetPath: string,
    filePath: string,
    file: string,
    crc32: string
  ) {
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

    return await this.preTransferSendRequest(
      device,
      targetPath,
      filePath,
      file,
      crc32
    )
  }

  @IpcEvent(ApiFileTransferServiceEvents.PreSendWithData)
  public async preTransferWithDataSend({
    dataId,
    targetPath,
    deviceId,
    data,
  }: {
    dataId: string
    targetPath: string
    deviceId?: DeviceId
    data: string
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

    const file = Buffer.from(data, "utf8").toString("base64")
    const crc32 = crc.crc32(file)

    return await this.preTransferSendRequest(
      device,
      targetPath,
      dataId,
      file,
      crc32
    )
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

  @IpcEvent(ApiFileTransferServiceEvents.RestorePreSend)
  public async restorePreTransferSend({
    restoreFileId,
    key,
    password,
    targetPath,
    deviceId,
  }: {
    restoreFileId: string
    key: string
    targetPath: string
    password?: string
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
    const wholeBackupFile =
      this.serviceBridge.fileManager.getFile(restoreFileId)
    const backup = JSON.parse(wholeBackupFile as string)

    const file: string = password
      ? AES.decrypt(backup.data[key], password).toString(encUtf8)
      : backup.data[key]

    if (!file) {
      return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    const crc32 = crc.crc32(file)

    return await this.preTransferSendRequest(
      device,
      targetPath,
      restoreFileId,
      file,
      crc32
    )
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
