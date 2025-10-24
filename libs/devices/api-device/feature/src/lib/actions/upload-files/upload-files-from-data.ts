/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PreFileTransferGetRequest } from "devices/api-device/models"
import { sumBy } from "lodash"
import { prePostFileTransfer } from "../../api/pre-post-file-transfer"
import { postFileTransfer } from "../../api/post-file-transfer"
import { AppFileSystem } from "app-utils/renderer"

export interface UploadFilesFromDataParams {
  device: ApiDevice
  targetFilePaths: PreFileTransferGetRequest["filePath"][]
  sourceData: string[] // Files data encoded as base64 strings
  onProgress: (progress: number) => void
  abortController: AbortController
}

export const uploadFilesFromData = async ({
  device,
  targetFilePaths,
  sourceData,
  onProgress,
  abortController,
}: UploadFilesFromDataParams) => {
  onProgress(0)

  const filesInfo: {
    data: string
    fileSize: number
    crc32: string
  }[] = []

  for (const data of sourceData) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const crc32Response = await AppFileSystem.calculateFileCrc32({ data: data })
    if (!crc32Response.ok) {
      throw new Error("Failed to calculate CRC32")
    }
    const crc32Value = crc32Response.data
    filesInfo.push({
      data,
      fileSize: data.length,
      crc32: crc32Value,
    })
  }

  const totalSize = sumBy(filesInfo, "fileSize")
  let uploadedSize = 0

  for (let i = 0; i < filesInfo.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const { data, fileSize, crc32 } = filesInfo[i]
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
      const chunkData = data.slice(
        chunkNumber * chunkSize,
        (chunkNumber + 1) * chunkSize
      )
      const uploadChunkResponse = await postFileTransfer(device, {
        data: chunkData,
        chunkNumber: chunkNumber + 1,
        transferId,
      })
      if (!uploadChunkResponse.ok) {
        throw new Error("Failed to upload file chunk")
      }

      uploadedSize += chunkData.length
      onProgress(Math.round((uploadedSize / totalSize) * 100))
    }
  }
  onProgress(100)
}
