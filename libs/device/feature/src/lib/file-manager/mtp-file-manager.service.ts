/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppMtp,
  MtpDevice,
  MtpStorage,
  MtpUploadFileData,
  UploadFileResultData,
  GetUploadFileProgressResultData,
} from "app-mtp"
import { useSelector } from "react-redux"

type UploadContext = {
  deviceId: string
  storageId: string
  transactionId: string
  sourcePath: string
  destinationPath: string
}

export class MtpFileManagerService {
  private static instance: MtpFileManagerService
  private mtp = new AppMtp()

  private uploads: Map<string, UploadContext> = new Map()

  private constructor() {}

  public static getInstance(): MtpFileManagerService {
    if (!MtpFileManagerService.instance) {
      MtpFileManagerService.instance = new MtpFileManagerService()
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
    const storageId = storages.find(
      (storage) => storage.isInternal === isInternal
    )?.id

    if (!storageId) throw new Error("No storage found for device")

    const uploadResults: UploadFileResultData[] = []

    for (const sourcePath of sourcePaths) {
      const result = await this.uploadFile(
        deviceId,
        storageId,
        sourcePath,
        destinationPath
      )

      if (result) {
        uploadResults.push(result)
      }
    }

    console.log("Upload Results: ", uploadResults)

    return uploadResults
  }

  private async getDeviceStorages(deviceId: string): Promise<MtpStorage[]> {
    const result = await this.mtp.getDeviceStorages(deviceId)

    if (result.ok) {
      return result.data
    }

    return []
  }

  private async uploadFile(
    deviceId: string,
    storageId: string,
    sourcePath: string,
    destinationPath: string
  ): Promise<UploadFileResultData | undefined> {
    const result = await this.mtp.uploadFile({
      deviceId,
      storageId,
      sourcePath,
      destinationPath,
    })

    if (result.ok) {
      return result.data
    }

    return undefined
  }

  private async getUploadProgress(transactionId: string): Promise<number> {
    const result = await this.mtp.getUploadFileProgress({ transactionId })

    return result.ok ? result.data.progress : 0
  }

  public async waitUntilUploadComplete(
    transactionId: string,
    intervalMs = 500
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const progress = await this.getUploadProgress(transactionId)
          if (progress >= 100) {
            clearInterval(interval)
            resolve()
          }
        } catch (e) {
          clearInterval(interval)
          reject(e)
        }
      }, intervalMs)
    })
  }
}
