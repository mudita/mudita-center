/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { clamp, sum } from "lodash"
import { AppFileSystem } from "app-utils/renderer"
import { AppResultFactory } from "app-utils/models"
import {
  DataSource,
  ExecuteTransferParams,
  ExecuteTransferResult,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { serialPreTransferStep } from "./serial-pre-transfer-step"
import { serialTransferStep } from "./serial-transfer-step"

function assertPathSource(
  s: DataSource
): asserts s is { type: "path"; path: string } {
  if (s.type !== "path")
    throw new Error("Download requires a path-based source")
}

export const serialDownloadFiles = async ({
  device,
  files,
  onProgress,
  abortController,
}: ExecuteTransferParams<ApiDevice>): Promise<ExecuteTransferResult> => {
  const paths = files.map((file) => {
    assertPathSource(file.source)
    return file.source.path
  })
  const completedSizes = paths.map(() => 0)
  const filesData: string[] = []
  const totalSizes: number[] = []

  for (let i = 0; i < paths.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const sourceFilePath = paths[i]
    const { fileSize } = await serialPreTransferStep({
      device,
      sourceFilePath,
      abortController,
    })
    totalSizes[i] = fileSize
  }

  onProgress?.({
    progress: 0,
    loaded: 0,
    total: sum(totalSizes),
  })

  for (let i = 0; i < paths.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const sourceFilePath = paths[i]
    const transferData = await serialPreTransferStep({
      device,
      sourceFilePath,
      abortController,
    })
    totalSizes[i] = transferData.fileSize
    filesData[i] = await serialTransferStep({
      device,
      transferData,
      onProgress: (progress) => {
        completedSizes[i] = (progress / 100) * transferData.fileSize
        const completedSize = sum(completedSizes)
        const totalSize = sum(totalSizes)
        onProgress?.({
          progress: clamp(
            Math.round((completedSize / totalSize) * 100),
            0,
            100
          ),
          loaded: completedSize,
          total: totalSize,
        })
      },
      abortController,
    })

    const fileCrc32 = transferData.crc32
    const calculatedCrc32 = await AppFileSystem.calculateFileCrc32({
      data: filesData[i],
    })
    if (!calculatedCrc32.ok) {
      throw new Error(`Failed to calculate crc32 for file ${sourceFilePath}`)
    }
    if (fileCrc32.toLowerCase() !== calculatedCrc32.data.toLowerCase()) {
      throw new Error(
        `File transfer failed due to crc32 mismatch for file ${sourceFilePath}`
      )
    }
  }

  onProgress?.({
    progress: 100,
    loaded: sum(totalSizes),
    total: sum(totalSizes),
  })

  return AppResultFactory.success({ files: filesData })
}
