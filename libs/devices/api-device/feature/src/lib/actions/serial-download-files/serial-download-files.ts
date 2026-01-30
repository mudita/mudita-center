/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { clamp, sum } from "lodash"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  isTransferDownloadFilesToLocationParams,
  isTransferDownloadFilesToMemoryParams,
} from "devices/common/models"
import { AppResultFactory } from "app-utils/models"
import { ApiDevice } from "devices/api-device/models"
import { AppFileSystem } from "app-utils/renderer"
import { serialPreTransferStep } from "./serial-pre-transfer-step"
import { serialTransferStep } from "./serial-transfer-step"

export const serialDownloadFiles = async (
  params: ExecuteTransferParams<ApiDevice>
): Promise<ExecuteTransferResult> => {
  if (
    !isTransferDownloadFilesToLocationParams(params) &&
    !isTransferDownloadFilesToMemoryParams(params)
  ) {
    throw new Error("Invalid parameters for serialDownloadFiles")
  }

  const { device, files, onProgress, abortController } = params

  const completedSizes = files.map(() => 0)
  const filesData: string[] = []
  const totalSizes: number[] = []

  for (let i = 0; i < files.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const sourceFilePath = files[i].source.path
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

  for (let i = 0; i < files.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const sourceFilePath = files[i].source.path
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
        const file = files[i]
        const fileProgress = clamp(Math.floor(progress), 0, 100)
        const fileLoaded = clamp(
          Math.floor((progress / 100) * transferData.fileSize),
          0,
          transferData.fileSize
        )
        completedSizes[i] = fileLoaded

        const completedSize = sum(completedSizes)
        const totalSize = sum(totalSizes)
        const totalProgress = clamp(
          Math.floor((completedSize / totalSize) * 100),
          0,
          100
        )
        onProgress?.({
          progress: totalProgress,
          loaded: completedSize,
          total: totalSize,
          file: {
            id: file.id,
            name: file.source.path.split("/").pop() || "",
            type: "file",
            size: transferData.fileSize,
            loaded: fileLoaded,
            progress: fileProgress,
            path: file.source.path,
            mimeType: "",
          },
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

    if (files[i].target.type === "path") {
      const writeResult = await AppFileSystem.writeFile({
        fileAbsolutePath: files[i].target.path,
        absolute: true,
        data: filesData[i],
        options: {
          encoding: "base64",
        },
      })

      if (!writeResult.ok) {
        throw new Error(
          `Failed to write file to location ${files[i].target.path}: ${writeResult.error.message}`
        )
      }
    }
  }

  onProgress?.({
    progress: 100,
    loaded: sum(totalSizes),
    total: sum(totalSizes),
  })

  if (isTransferDownloadFilesToLocationParams(params)) {
    return AppResultFactory.success({})
  } else {
    return AppResultFactory.success({ files: filesData })
  }
}
