/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sumBy } from "lodash"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
} from "devices/common/models"
import { ApiDevice, PreFileTransferGetRequest } from "devices/api-device/models"
import { AppFileSystem } from "app-utils/renderer"
import { AppResultFactory } from "app-utils/models"
import { prePostFileTransfer } from "../../api/pre-post-file-transfer"
import { postFileTransfer } from "../../api/post-file-transfer"
import { deleteFileTransfer } from "../../api/delete-file-transfer"

interface ApiDeviceTransferFileEntry {
  id: string
  source: { type: "memory"; data: (string | Uint8Array<ArrayBufferLike>)[] }
  target: { type: "path"; path: PreFileTransferGetRequest["filePath"] }
}

export interface UploadFilesFromDataParams
  extends ExecuteTransferParams<ApiDevice> {
  files: ApiDeviceTransferFileEntry[]
}

type FileEntry = ApiDeviceTransferFileEntry & {
  fileSize: number
  crc32: string
}

export const uploadFilesFromData = async ({
  device,
  files,
  onProgress,
  abortController,
}: UploadFilesFromDataParams): Promise<ExecuteTransferResult> => {
  const filesInfo: FileEntry[] = []

  for (const file of files) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const crc32Response = await AppFileSystem.calculateFileCrc32({
      data: file.source.data as unknown as string,
    })
    if (!crc32Response.ok) {
      throw new Error("Failed to calculate CRC32")
    }
    const crc32Value = crc32Response.data
    filesInfo.push({
      ...file,
      fileSize: file.source.data.length,
      crc32: crc32Value,
    })
  }

  const totalSize = sumBy(filesInfo, "fileSize")
  let uploadedTotalSize = 0

  onProgress?.({
    progress: 0,
    loaded: 0,
    total: totalSize,
  })

  for (let i = 0; i < filesInfo.length; i++) {
    if (abortController.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const { fileSize, crc32 } = filesInfo[i]
    const targetFilePath = filesInfo[i].target.path

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

    let uploadedWithinFile = 0
    for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
      if (abortController.signal.aborted) {
        await deleteFileTransfer(device, { fileTransferId: transferId })
        throw new Error("File transfer aborted")
      }
      const chunkData = filesInfo[i].source.data.slice(
        chunkNumber * chunkSize,
        (chunkNumber + 1) * chunkSize
      )
      const uploadChunkResponse = await postFileTransfer(device, {
        data: chunkData as unknown as string,
        chunkNumber: chunkNumber + 1,
        transferId,
      })
      if (!uploadChunkResponse.ok) {
        await deleteFileTransfer(device, { fileTransferId: transferId })
        throw new Error("Failed to upload file chunk")
      }

      uploadedWithinFile = Math.min(
        fileSize,
        Math.floor(((chunkNumber + 1) * fileSize) / fileChunksCount)
      )

      const loaded = uploadedTotalSize + uploadedWithinFile
      const progress = Math.floor((loaded / totalSize) * 100)

      onProgress?.({
        progress,
        loaded,
        total: totalSize,
        file: {
          id: targetFilePath,
          name: targetFilePath.split("/").pop() || "",
          type: "file",
          size: fileSize,
          loaded: uploadedWithinFile,
          progress: Math.floor((uploadedWithinFile / fileSize) * 100),
        },
      })
    }

    uploadedTotalSize += fileSize
  }
  onProgress?.({ progress: 100, loaded: totalSize, total: totalSize })

  return AppResultFactory.success({})
}
