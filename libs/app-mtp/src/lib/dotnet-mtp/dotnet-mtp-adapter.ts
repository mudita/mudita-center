/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { spawn } from "child_process"
import {
  CheckProgressData,
  MtpDevice,
  MtpStorage,
  MtpUploadFileData,
} from "../app-mtp.interface"

export class DotnetMtpAdapter {
  private uploadFileProgress: Record<string, number> = {}

  async getDevices(): Promise<MtpDevice[]> {
    return Promise.resolve([{ id: "device-1" }])
  }

  async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    return Promise.resolve([{ id: "storage-1" }, { id: "storage-2" }])
  }

  async uploadFile(
    data: MtpUploadFileData,
    transactionId: string
  ): Promise<void> {
    this.uploadFileProgress[transactionId] = 0

    return new Promise((resolve, reject) => {
      // const exePath = process.env.MTP_WINDOWS_APP_PATH as string
      const exePath =
        "C:\\Users\\MUDITA\\projects\\mudita-center\\apps\\mudita-center\\resources\\MtpFileTransfer_boxed2.exe"
      const args = '{"action":"UPLOAD_FILE"}'
      const child = spawn(exePath, [args])

      child.stdout.on("data", (data) => {
        console.log(`[app-mtp-server/dotnet-mtp-adapter] data stdout: ${data}`)
        this.uploadFileProgress[transactionId] = JSON.parse(data).data.Progress
      })

      child.stderr.on("data", (data) => {
        console.error(
          `[app-mtp-server/dotnet-mtp-adapter] data stderr: ${data}`
        )
      })

      child.on("close", (code) => {
        if (code !== 0) {
          console.log(
            `[app-mtp-server/dotnet-mtp-adapter] child process exited with code: ${code}`
          )
        } else {
          console.log(
            `[app-mtp-server/dotnet-mtp-adapter] child process exited successfully`
          )
        }

        resolve()
      })
    })
  }

  async checkProgress({ transactionId }: CheckProgressData): Promise<number> {
    return this.uploadFileProgress[transactionId]
  }
}
