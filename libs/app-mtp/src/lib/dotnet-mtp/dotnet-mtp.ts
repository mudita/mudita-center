/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { spawn } from "child_process"
import {
  GetUploadFileProgress,
  MtpDevice,
  MtpInterface,
  MtpStorage,
  MtpUploadFileData,
} from "../app-mtp.interface"
import { generateId } from "../utils/generate-id"
import path from "path"

export class DotnetMtp implements MtpInterface {
  private uploadFileProgress: Record<string, number> = {}

  async getDevices(): Promise<MtpDevice[]> {
    return Promise.resolve([{ id: "device-1" }])
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return Promise.resolve([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(data: MtpUploadFileData): Promise<string> {
    const transactionId = generateId()
    void this.processFileUpload(data, transactionId)
    console.log(`[app-mtp-server/dotnet-mtp] transactionId: ${transactionId}%`)
    return Promise.resolve(transactionId)
  }

  async getUploadFileProgress({
    transactionId,
  }: GetUploadFileProgress): Promise<number> {
    return this.uploadFileProgress[transactionId]
  }

  private async processFileUpload(
    data: MtpUploadFileData,
    transactionId: string
  ): Promise<void> {
    this.uploadFileProgress[transactionId] = 0

    return new Promise((resolve, reject) => {
      const exePath = path.join(
        __dirname,
        "../../../../../apps/mudita-center/resources/MtpFileTransfer_boxed.exe"
      )
      const args = '{"action":"UPLOAD_FILE"}'
      const child = spawn(exePath, [args])

      child.stdout.on("data", (data) => {
        console.log(`[app-mtp-server/dotnet-mtp] data stdout: ${data}`)
        this.uploadFileProgress[transactionId] = JSON.parse(data).data.Progress
      })

      child.stderr.on("data", (data) => {
        console.error(`[app-mtp-server/dotnet-mtp] data stderr: ${data}`)
      })

      child.on("close", (code) => {
        if (code !== 0) {
          console.log(
            `[app-mtp-server/dotnet-mtp] child process exited with code: ${code}`
          )
        } else {
          console.log(
            `[app-mtp-server/dotnet-mtp] child process exited successfully`
          )
        }

        resolve()
      })
    })
  }
}
