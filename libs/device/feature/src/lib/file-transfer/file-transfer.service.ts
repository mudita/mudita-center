/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError, AppErrorType } from "Core/core/errors"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import {
  ApiFileTransferError,
  ApiFileTransferServiceEvents,
  FileTransferStatuses,
  GeneralError,
  PreTransferGet200,
  PreTransferGet200Validator,
  PreTransferGet202,
  PreTransferGet202Validator,
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
import { delay } from "shared/utils"
import { CRC32Calculator } from "Core/utils/crc32-calculator"

interface Transfer {
  crc32: string
  fileSize: number
  filePath: string
  chunks: string[]
  crc32Calc?: CRC32Calculator
}

const DEFAULT_MAX_REPEATS = 2

export class APIFileTransferService {
  constructor(
    private deviceProtocol: DeviceProtocol,
    private serviceBridge: ServiceBridge,
    private transfers: Record<string, Transfer> = {}
  ) {}

  private prepareFile(source: { path: string } | { base64: string }) {
    if ("path" in source) {
      const file = readFileSync(source.path, {
        encoding: "base64",
      })
      return {
        file,
        crc32: crc.crc32(file),
      }
    }
    return {
      file: source.base64,
      crc32: crc.crc32(source.base64),
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
    targetPath,
    deviceId,
    source,
  }: {
    targetPath: string
    deviceId?: DeviceId
    source:
      | {
          path: string
        }
      | {
          base64: string
        }
  }): Promise<
    ResultObject<{
      transferId: number
      chunksCount: number
    }>
  > {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }
    const { crc32, file } = this.prepareFile(source)

    return await this.preTransferSendRequest(
      device,
      targetPath,
      "path" in source ? source.path : "base64",
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
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

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
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

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
        await delay()
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

  private calculateChecksum(transferId: number) {
    const crc32 = this.transfers[transferId].crc32Calc?.digest()
    if (crc32 === undefined) {
      return false
    }

    return (
      crc32.toString(16).toLowerCase() ===
      this.transfers[transferId].crc32.toLowerCase()
    )
  }

  @IpcEvent(ApiFileTransferServiceEvents.SendDelete)
  public async transferSendDelete({
    transferId,
    deviceId,
  }: {
    transferId: number
    deviceId?: DeviceId
  }) {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "FILE_TRANSFER",
      method: "DELETE",
      body: {
        fileTransferId: transferId,
      },
    })

    if (!response.ok) {
      return handleError(response.error.type)
    }

    return Result.success({ status: response.data.status })
  }

  @IpcEvent(ApiFileTransferServiceEvents.PreGet)
  public async preTransferGet({
    filePath,
    deviceId,
  }: {
    filePath: string
    deviceId?: DeviceId
  }): Promise<ResultObject<PreTransferGet200 | PreTransferGet202>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

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
      let preTransferResponse
      const status = response.data.status
      if (status === 200) {
        preTransferResponse = PreTransferGet200Validator.safeParse(
          response.data.body
        )
      } else {
        preTransferResponse = PreTransferGet202Validator.safeParse(
          response.data.body
        )
      }

      const success = preTransferResponse.success

      if (!success) {
        return handleError(response.data.status)
      }

      if (status === 200) {
        const data = preTransferResponse.data as PreTransferGet200
        this.transfers[preTransferResponse.data.transferId] = {
          crc32: data.crc32,
          fileSize: data.fileSize,
          filePath,
          chunks: [],
        }
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
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

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
        await delay()
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

    if (!this.transfers[transferId].crc32Calc) {
      this.transfers[transferId].crc32Calc = new CRC32Calculator()
    }

    this.transfers[transferId].chunks[chunkNumber - 1] =
      transferResponse.data.data
    this.transfers[transferId].crc32Calc!.update(transferResponse.data.data)

    if (
      (response.data.status as number) ===
      FileTransferStatuses.WholeFileTransferred
    ) {
      if (this.calculateChecksum(transferId)) {
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
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

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
