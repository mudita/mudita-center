/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { spawn } from "child_process"
import path from "path"
import {
  GetUploadFileProgress,
  GetUploadFileProgressResultData,
  MtpDevice,
  MTPError,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
  TransactionStatus,
  UploadFileResultData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import {
  Result,
  ResultObject,
} from "../../../../core/core/builder/result.builder"
import { translateStatus } from "./utils/map-to-mtp-error"
import { AppError } from "../../../../core/core/errors/app-error"
import { MtpCliCommandAction } from "./dotnet-mtp.interface"
import { createReadlineInterface } from "./utils/create-readline-interface"

export class DotnetMtp implements MtpInterface {
  private uploadFileTransactionStatus: Record<string, TransactionStatus> = {}

  async getDevices(): Promise<MtpDevice[]> {
    return [{ id: "device-1", name: "Device 1" }]
  }

  async getDeviceStorages(
    deviceId: string
  ): Promise<ResultObject<MtpStorage[]>> {
    return Result.success([
      { id: "storage-1", name: "Storage 1" },
      { id: "storage-2", name: "Storage 2" },
    ])
  }

  async uploadFile(
    data: MtpUploadFileData
  ): Promise<ResultObject<UploadFileResultData>> {
    const transactionId = generateId()
    void this.processFileUpload(data, transactionId)
    return Result.success({ transactionId })
  }

  async getUploadFileProgress({
    transactionId,
  }: GetUploadFileProgress): Promise<
    ResultObject<GetUploadFileProgressResultData>
  > {
    const transactionStatus = this.uploadFileTransactionStatus[transactionId]

    if (!transactionStatus) {
      return Result.failed({
        type: MTPError.MTP_TRANSACTION_NOT_FOUND,
      } as AppError)
    }
    return transactionStatus.error !== undefined
      ? Result.failed(transactionStatus.error)
      : Result.success({ progress: transactionStatus.progress })
  }

  private async processFileUpload(
    data: MtpUploadFileData,
    transactionId: string
  ): Promise<void> {
    this.uploadFileTransactionStatus[transactionId] = {
      progress: 0,
    }

    return new Promise((resolve, reject) => {
      const exePath = path.join(
        __dirname,
        "../../../../../apps/mudita-center/resources/MtpFileTransfer_boxed.exe"
      )
      const uploadRequest = {
        action: MtpCliCommandAction.UPLOAD_FILE,
        ...data,
      }

      const args = JSON.stringify(uploadRequest)
      const child = spawn(exePath, [args])
      const stdOut = createReadlineInterface(child.stdout)
      const stdErr = createReadlineInterface(child.stderr)

      stdOut.on("line", (line) => {
        console.log(`[app-mtp/dotnet-mtp] data stdout: ${line}`)
        this.uploadFileTransactionStatus[transactionId].progress =
          JSON.parse(line).data.progress
      })

      stdErr.on("line", (line) => {
        const errorType = translateStatus(JSON.parse(line).status)
        const appError = { type: errorType } as AppError
        console.error(
          `[app-mtp/dotnet-mtp] data stderr: ${JSON.stringify(appError)}`
        )
        this.uploadFileTransactionStatus[transactionId].error = appError
      })

      child.on("close", (code: number) => {
        if (code !== 0) {
          console.log(
            `[app-mtp/dotnet-mtp] child process exited with code: ${code}`
          )
        } else {
          console.log(`[app-mtp/dotnet-mtp] child process exited successfully`)
        }

        resolve()
      })
    })
  }
}
