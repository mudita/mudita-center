/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppMtp, MtpStorage, UploadFileResultData } from "app-mtp"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  registerMtpUpload,
  updateMtpUploadProgress,
  finishMtpUpload,
  failMtpUpload,
} from "../../../../../generic-view/store/src/lib/mtp-file-transfer/actions"

export class MtpFileManagerService {
  private static instance: MtpFileManagerService
  private mtp = new AppMtp()
  private dispatch: Dispatch

  private constructor(dispatch: Dispatch) {
    this.dispatch = dispatch
  }

  public static getInstance(dispatch: Dispatch): MtpFileManagerService {
    if (!MtpFileManagerService.instance) {
      MtpFileManagerService.instance = new MtpFileManagerService(dispatch)
    }
    return MtpFileManagerService.instance
  }

  public async uploadFiles(
    sourcePaths: string[],
    destinationPath: string,
    isInternal: boolean | undefined,
    deviceId: string | undefined
  ): Promise<UploadFileResultData[]> {
    if (!deviceId) throw new Error("No active MTP device found")

    const storages = await this.getDeviceStorages(deviceId)
    const storageId = storages.find((s) => s.isInternal === isInternal)?.id

    if (!storageId) throw new Error("No storage found for device")

    const uploadResults: UploadFileResultData[] = []

    for (const sourcePath of sourcePaths) {
      const result = await this.mtp.uploadFile({
        deviceId,
        storageId,
        sourcePath,
        destinationPath,
      })

      if (result.ok && result.data.transactionId) {
        const transactionId = result.data.transactionId

        this.dispatch?.(
          registerMtpUpload({
            transactionId: transactionId,
            deviceId,
            storageId,
            filePath: sourcePath,
            destinationPath,
          })
        )

        this.trackProgress(transactionId)

        uploadResults.push(result.data)
      } else {
        console.error("Upload error", result)
      }
    }

    return uploadResults
  }

  private async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    const result = await this.mtp.getDeviceStorages(deviceId)

    return result.ok ? result.data : []
  }

  private async trackProgress(
    transactionId: string,
    intervalMs = 500
  ): Promise<void> {
    const interval = setInterval(async () => {
      try {
        const progressResult = await this.mtp.getUploadFileProgress({
          transactionId,
        })

        if (!progressResult.ok) throw new Error("Failed to fetch progress")

        const progress = progressResult.data.progress

        this.dispatch?.(updateMtpUploadProgress({ transactionId, progress }))

        if (progress >= 100) {
          clearInterval(interval)

          this.dispatch?.(finishMtpUpload({ transactionId }))
        }
      } catch (error) {
        clearInterval(interval)

        this.dispatch?.(
          failMtpUpload({ transactionId, error: (error as Error).message })
        )
      }
    }, intervalMs)
  }
}
