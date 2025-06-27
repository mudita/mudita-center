/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CancelTransferResultData,
  TransferTransactionData,
  GetTransferFileProgressResultData,
  MtpDevice,
  MTPError,
  MtpInterface,
  MtpStorage,
  MtpTransferFileData,
  TransactionStatus,
  TransferFileResultData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import {
  Result,
  ResultObject,
} from "../../../../core/core/builder/result.builder"
import { translateStatus } from "./utils/map-to-mtp-error"
import { AppError } from "../../../../core/core/errors/app-error"
import { DotnetCliCommandAction } from "./dotnet-mtp.interface"
import { runCommand } from "./utils/handle-command"

const PREFIX_LOG = `[app-mtp/dotnet-mtp]`

export class DotnetMtp implements MtpInterface {
  private fileTransferTransactionStatus: Record<string, TransactionStatus> = {}
  private abortController: AbortController | undefined

  async getDevices(): Promise<MtpDevice[]> {
    const mtpDevices: MtpDevice[] = []
    const request = { action: DotnetCliCommandAction.GET_DEVICES }

    await runCommand(
      request,
      (line: string) => {
        console.log(`${PREFIX_LOG} getDevices stdout: ${line}`)
        const result = JSON.parse(line).data as {
          deviceId: string
          label: string
        }[]
        result.forEach((item) => {
          mtpDevices.push({ id: item.deviceId, name: item.label })
        })
      },
      (line: string) => {
        const errorType = translateStatus(JSON.parse(line).status)
        const appError = { type: errorType } as AppError
        console.error(
          `${PREFIX_LOG} getDevices stderr: ${JSON.stringify(appError)}`
        )
      }
    )
    return mtpDevices
  }

  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    const mtpDeviceStorages: MtpStorage[] = []
    let appError: AppError | undefined
    const request = {
      action: DotnetCliCommandAction.GET_DEVICE_STORAGES,
      deviceId,
    }

    await runCommand(
      request,
      (line: string) => {
        console.log(`${PREFIX_LOG} getDeviceStorages stdout: ${line}`)
        const result = JSON.parse(line).data as {
          volumeId: string
          volumeName: string
          isInternal: boolean
        }[]
        result.forEach((item) => {
          mtpDeviceStorages.push({
            id: item.volumeId,
            name: item.volumeName,
            isInternal: item.isInternal,
          })
        })
      },
      (line: string) => {
        const errorType = translateStatus(JSON.parse(line).status)
        appError = { type: errorType } as AppError
        console.error(
          `${PREFIX_LOG} getDeviceStorages stderr: line: ${JSON.stringify(
            line
          )} error: ${JSON.stringify(appError)}`
        )
      }
    )

    return appError
      ? Result.failed(appError)
      : Result.success(mtpDeviceStorages)
  }

  async uploadFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>> {
    const transactionId = generateId()
    void this.processFileTransfer(
      data,
      transactionId,
      DotnetCliCommandAction.UPLOAD_FILE
    )
    return Result.success({ transactionId })
  }

  async exportFile(
    data: MtpTransferFileData
  ): Promise<ResultObject<TransferFileResultData>> {
    const transactionId = generateId()
    void this.processFileTransfer(
      data,
      transactionId,
      DotnetCliCommandAction.EXPORT_FILE
    )
    return Result.success({ transactionId })
  }

  async getTransferredFileProgress({
    transactionId,
  }: TransferTransactionData): Promise<
    ResultObject<GetTransferFileProgressResultData>
  > {
    const transactionStatus = this.fileTransferTransactionStatus[transactionId]

    if (!transactionStatus) {
      return Result.failed({
        type: MTPError.MTP_TRANSACTION_NOT_FOUND,
      } as AppError)
    }
    return transactionStatus.error !== undefined
      ? Result.failed(transactionStatus.error)
      : Result.success({ progress: transactionStatus.progress })
  }

  async cancelFileTransfer(
    data: TransferTransactionData
  ): Promise<ResultObject<CancelTransferResultData>> {
    const transactionStatus =
      this.fileTransferTransactionStatus[data.transactionId]

    if (transactionStatus === undefined) {
      return Result.failed({
        type: MTPError.MTP_TRANSACTION_NOT_FOUND,
      } as AppError)
    } else if (transactionStatus.progress === 100) {
      return Result.failed({
        type: MTPError.MTP_CANCEL_FAILED_ALREADY_TRANSFERRED,
      } as AppError)
    } else {
      this.abortController?.abort()
      console.log(
        `${PREFIX_LOG} Canceling file transfer for transactionId ${data.transactionId}, signal abort status: ${this.abortController?.signal.aborted}`
      )
      return Result.success({})
    }
  }

  private async processFileTransfer(
    data: MtpTransferFileData,
    transactionId: string,
    action: DotnetCliCommandAction
  ): Promise<void> {
    this.abortController = new AbortController()
    this.fileTransferTransactionStatus[transactionId] = { progress: 0 }
    const request = { action, ...data }
    await runCommand(
      request,
      (line: string) => {
        console.log(
          `${PREFIX_LOG} file transfer stdout: ${line} for file ${data.sourcePath}`
        )
        const parsed = JSON.parse(line)
        this.fileTransferTransactionStatus[transactionId].progress =
          parsed.data.progress
      },
      (line: string) => {
        const errorType = translateStatus(JSON.parse(line).status)
        const appError = { type: errorType } as AppError
        console.error(
          `${PREFIX_LOG} file transfer stderr: ${JSON.stringify(
            appError
          )} for file ${data.sourcePath}`
        )
        this.fileTransferTransactionStatus[transactionId].error = appError
      },
      this.abortController.signal
    )
      .then(() => {
        console.log(`${PREFIX_LOG} file transfer command status: finished`)
      })
      .catch((error) => {
        const appError = { type: error } as AppError
        this.fileTransferTransactionStatus[transactionId].error = appError
        console.error(`${PREFIX_LOG} uploadFile command status: error`, error)
      })
  }
}
