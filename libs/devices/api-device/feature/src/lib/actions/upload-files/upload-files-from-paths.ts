/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PreFileTransferGetRequest } from "devices/api-device/models"
import { AppFileSystem } from "app-utils/renderer"
import { crc32 } from "node:zlib"
import { sumBy } from "lodash"
import { prePostFileTransfer } from "../../api/pre-post-file-transfer"
import { postFileTransfer } from "../../api/post-file-transfer"
import { AbsolutePathWithGrantOptions } from "app-utils/models"

export interface UploadFilesFromPathsParams {
  device: ApiDevice
  targetFilePaths: PreFileTransferGetRequest["filePath"][]
  sourceFilePaths: AbsolutePathWithGrantOptions["fileAbsolutePath"][]
  onProgress: (progress: number) => void
  abortController: AbortController
}

export const uploadFilesFromPaths = async ({
  device,
  targetFilePaths,
  sourceFilePaths,
  onProgress,
  abortController,
}: UploadFilesFromPathsParams) => {
  onProgress(0)

  const filesInfo: {
    filePath: string | string[]
    fileSize: number
    crc32: string
  }[] = []

  for (const filePath of sourceFilePaths) {
    const file = await AppFileSystem.readFile({
      fileAbsolutePath: filePath,
      absolute: true,
    })
    if (!file.ok) {
      throw new Error("Failed to get file")
    }
    const crc32Value = (crc32(file.data) >>> 0)
      .toString(16)
      .toUpperCase()
      .padStart(8, "0")

    filesInfo.push({
      filePath,
      fileSize: file.data.length,
      crc32: crc32Value,
    })
  }

  const totalSize = sumBy(filesInfo, "fileSize")
  let uploadedSize = 0

  for (let i = 0; i < filesInfo.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const { filePath, fileSize, crc32 } = filesInfo[i]
    const targetFilePath = targetFilePaths[i]

    const preTransferResponse = await prePostFileTransfer(device, {
      filePath: targetFilePath,
      fileSize,
      crc32,
    })
    if (!preTransferResponse.ok) {
      throw new Error("Pre file transfer failed")
    }
    const { transferId, chunkSize } = preTransferResponse.body
    const fileChunksCount = Math.ceil(fileSize / chunkSize)

    for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
      if (abortController.signal.aborted) {
        throw new Error("File transfer aborted")
      }
      const fileChunkResponse = await AppFileSystem.readFileChunk({
        fileAbsolutePath: filePath,
        absolute: true,
        chunkNo: chunkNumber,
        chunkSize,
      })
      if (!fileChunkResponse.ok) {
        throw new Error("Failed to read file chunk")
      }

      const uploadChunkResponse = await postFileTransfer(device, {
        data: fileChunkResponse.data,
        chunkNumber: chunkNumber + 1,
        transferId,
      })
      if (!uploadChunkResponse.ok) {
        throw new Error("Failed to upload file chunk")
      }

      uploadedSize += fileChunkResponse.data.length
      onProgress(Math.round((uploadedSize / totalSize) * 100))
    }
  }
  onProgress(100)
}
