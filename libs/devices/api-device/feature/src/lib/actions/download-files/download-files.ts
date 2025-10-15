/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PreFileTransferGetRequest } from "devices/api-device/models"
import { clamp, sum } from "lodash"
import { preTransferStep } from "./pre-transfer-step"
import { transferStep } from "./transfer-step"

interface DownloadFilesParams {
  device: ApiDevice
  sourceFilePaths: PreFileTransferGetRequest["filePath"][]
  onProgress: (progress: number) => void
  abortController: AbortController
}

export const downloadFiles = async ({
  device,
  sourceFilePaths,
  onProgress,
  abortController,
}: DownloadFilesParams) => {
  const completedSizes = sourceFilePaths.map(() => 0)
  const filesData: string[] = []
  const totalSizes: number[] = []

  onProgress(0)

  for (let i = 0; i < sourceFilePaths.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const sourceFilePath = sourceFilePaths[i]
    // Pretransfer step to get files size for progress calculation
    const { fileSize } = await preTransferStep({
      device,
      sourceFilePath,
      abortController,
    })
    totalSizes[i] = fileSize
  }

  for (let i = 0; i < sourceFilePaths.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const sourceFilePath = sourceFilePaths[i]
    const transferData = await preTransferStep({
      device,
      sourceFilePath,
      abortController,
    })
    // Update file's total size in case it changed
    totalSizes[i] = transferData.fileSize
    filesData[i] = await transferStep({
      device,
      transferData,
      onProgress: (progress) => {
        completedSizes[i] = (progress / 100) * transferData.fileSize
        const completedSize = sum(completedSizes)
        const totalSize = sum(totalSizes)
        onProgress(clamp(Math.round((completedSize / totalSize) * 100), 0, 100))
      },
      abortController,
    })
  }

  onProgress(100)

  return filesData
}
