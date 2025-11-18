/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sumBy } from "lodash"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFileFromPathEntry,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { AppFileSystem, readFileTransferMetadataList } from "app-utils/renderer"
import { AppResultFactory } from "app-utils/models"
import { prePostFileTransfer } from "../../api/pre-post-file-transfer"
import { postFileTransfer } from "../../api/post-file-transfer"
import { postEntityData } from "../../api/post-entity-data"
import { deleteFileTransfer } from "../../api/delete-file-transfer"

export interface UploadFilesFromPathsParams
  extends ExecuteTransferParams<ApiDevice> {
  files: TransferFileFromPathEntry[]
}

const PROGRESS_ENTITY_PHASE_RATIO = 0.1
const PROGRESS_UPLOAD_PHASE_RATIO = 1 - PROGRESS_ENTITY_PHASE_RATIO

enum UploadFilesFromPathsErrorName {
  PreSendError = "PreSendError",
  ChunkReadError = "ChunkReadError",
  ChunkSendError = "ChunkSendError",
  EntityCreationError = "EntityCreationError",
}

export const serialUploadFilesFromPath = async ({
  device,
  files,
  onProgress,
  abortController,
  entityType,
}: UploadFilesFromPathsParams): Promise<ExecuteTransferResult> => {
  const failed: FailedTransferItem[] = []
  const {
    files: fileEntryWithMetadata,
    failed: readFileTransferMetadataListFailed,
  } = await readFileTransferMetadataList(files)
  failed.push(...readFileTransferMetadataListFailed)

  const totalSize = sumBy(fileEntryWithMetadata, "fileSize")
  let uploadedTotalSize = 0

  onProgress?.({ progress: 0, loaded: 0, total: totalSize })

  for (const file of fileEntryWithMetadata) {
    if (abortController.signal.aborted) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Aborted,
      })

      continue
    }

    const { crc32, fileSize } = file
    const targetFilePath = file.target.path

    const preTransferResponse = await prePostFileTransfer(device, {
      filePath: targetFilePath,
      fileSize: fileSize,
      crc32,
    })

    if (!preTransferResponse.ok) {
      failed.push({
        id: file.id,
        errorName: UploadFilesFromPathsErrorName.PreSendError,
      })

      continue
    }

    const { transferId, chunkSize } = preTransferResponse.body
    const fileChunksCount = Math.ceil(fileSize / chunkSize)
    let uploadedWithinFile = 0
    let isErrorOccurred = false

    const handleAbort = async (errorName: FailedTransferErrorName | string) => {
      await deleteFileTransfer(device, { fileTransferId: transferId })
      isErrorOccurred = true
      failed.push({
        id: file.id,
        errorName,
      })
    }

    for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
      if (abortController.signal.aborted) {
        await handleAbort(FailedTransferErrorName.Aborted)

        break
      }
      const fileChunkResponse = await AppFileSystem.readFileChunk({
        ...file.source.fileLocation,
        chunkNo: chunkNumber,
        chunkSize,
      })
      if (!fileChunkResponse.ok) {
        await handleAbort(UploadFilesFromPathsErrorName.ChunkReadError)

        break
      }

      const uploadChunkResponse = await postFileTransfer(device, {
        data: fileChunkResponse.data,
        chunkNumber: chunkNumber + 1,
        transferId,
      })

      if (!uploadChunkResponse.ok) {
        await handleAbort(UploadFilesFromPathsErrorName.ChunkSendError)

        break
      }

      uploadedWithinFile = Math.min(
        fileSize,
        Math.floor(((chunkNumber + 1) * fileSize) / fileChunksCount)
      )

      const fileProgress = Math.floor(
        (uploadedWithinFile / fileSize) * 100 * PROGRESS_UPLOAD_PHASE_RATIO
      )
      const loaded =
        uploadedTotalSize + uploadedWithinFile * PROGRESS_UPLOAD_PHASE_RATIO
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
          progress: fileProgress,
        },
      })
    }

    uploadedTotalSize += fileSize

    if (entityType && !isErrorOccurred) {
      const postEntityDataResponse = await postEntityData(device, {
        entityType,
        data: {
          filePath: targetFilePath,
          entityType,
        },
      })

      if (!postEntityDataResponse.ok) {
        failed.push({
          id: file.id,
          errorName: UploadFilesFromPathsErrorName.EntityCreationError,
        })

        continue
      }

      const loadedAfterEntity = uploadedTotalSize + fileSize
      const progressAfterEntity = Math.floor(
        (loadedAfterEntity / totalSize) * 100
      )

      onProgress?.({
        progress: progressAfterEntity,
        loaded: loadedAfterEntity,
        total: totalSize,
        file: {
          id: targetFilePath,
          name: targetFilePath.split("/").pop() || "",
          type: "file",
          size: fileSize,
          loaded: fileSize,
          progress: 100,
        },
      })
    }
  }

  onProgress?.({ progress: 100, loaded: totalSize, total: totalSize })

  return AppResultFactory.success({ failed })
}
