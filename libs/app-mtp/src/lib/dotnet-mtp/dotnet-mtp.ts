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
    return Result.success({
      progress: this.uploadFileTransactionStatus[transactionId].progress,
    })
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
      const args = '{"action":"UPLOAD_FILE"}'
      const child = spawn(exePath, [args])

      child.stdout.on("data", (data) => {
        console.log(`[app-mtp/dotnet-mtp] data stdout: ${data}`)
        this.uploadFileTransactionStatus[transactionId].progress =
          JSON.parse(data).data.progress
      })

      child.stderr.on("data", (data) => {
        console.error(`[app-mtp/dotnet-mtp] data stderr: ${data}`)
      })

      child.on("close", (code) => {
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
