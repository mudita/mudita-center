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
import {
  AppFileSystem,
  ReadFileTransferMetadataErrorName,
} from "app-utils/renderer"
import { AppResultFactory } from "app-utils/models"
import { prePostFileTransfer } from "../../api/pre-post-file-transfer"
import { postFileTransfer } from "../../api/post-file-transfer"
import { postEntityData } from "../../api/post-entity-data"
import { deleteFileTransfer } from "../../api/delete-file-transfer"

export interface UploadFilesFromPathsParams extends ExecuteTransferParams<ApiDevice> {
  files: TransferFileFromPathEntry[]
}

const PROGRESS_ENTITY_PHASE_RATIO = 0.1
const PROGRESS_UPLOAD_PHASE_RATIO = 1 - PROGRESS_ENTITY_PHASE_RATIO

enum UploadFilesFromPathsErrorName {
  PreSendError = "PreSendError",
  ChunkSendError = "ChunkSendError",
  EntityCreationError = "EntityCreationError",
}

interface PreparedSerialUploadFileEntry extends TransferFileFromPathEntry {
  transferFileSize: number
  sourceFileSize: number
  crc32: string
  transferData: string
}

export const serialUploadFilesFromPath = async ({
  device,
  files,
  onProgress,
  abortController,
  entityType,
}: UploadFilesFromPathsParams): Promise<ExecuteTransferResult> => {
  const failed: FailedTransferItem[] = []
  const { files: preparedFiles, failed: prepareFilesFailed } =
    await prepareSerialUploadFiles(files, abortController)

  failed.push(...prepareFilesFailed)

  const totalSize = sumBy(preparedFiles, "sourceFileSize")
  let uploadedTotalSize = 0

  onProgress?.({ progress: 0, loaded: 0, total: totalSize })

  for (const file of preparedFiles) {
    if (abortController.signal.aborted) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Aborted,
      })

      continue
    }

    const { crc32, transferFileSize, sourceFileSize, transferData } = file
    const targetFilePath = file.target.path

    const preTransferResponse = await prePostFileTransfer(device, {
      filePath: targetFilePath,
      fileSize: transferFileSize,
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
    const fileChunksCount = Math.ceil(transferFileSize / chunkSize)
    let uploadedWithinTransfer = 0
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
      const uploadChunkResponse = await postFileTransfer(device, {
        data: transferData.slice(
          chunkNumber * chunkSize,
          (chunkNumber + 1) * chunkSize
        ),
        chunkNumber: chunkNumber + 1,
        transferId,
      })

      if (!uploadChunkResponse.ok) {
        await handleAbort(UploadFilesFromPathsErrorName.ChunkSendError)

        break
      }

      uploadedWithinTransfer = Math.min(
        transferFileSize,
        Math.floor(((chunkNumber + 1) * transferFileSize) / fileChunksCount)
      )
      const uploadedWithinFile = Math.min(
        sourceFileSize,
        Math.floor((uploadedWithinTransfer / transferFileSize) * sourceFileSize)
      )

      const fileProgress = Math.floor(
        (uploadedWithinFile / sourceFileSize) *
          100 *
          PROGRESS_UPLOAD_PHASE_RATIO
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
          size: sourceFileSize,
          loaded: uploadedWithinFile,
          progress: fileProgress,
          path: targetFilePath,
          mimeType: "",
        },
      })
    }

    uploadedTotalSize += sourceFileSize

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

      const loadedAfterEntity = uploadedTotalSize
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
          size: sourceFileSize,
          loaded: sourceFileSize,
          progress: 100,
          path: targetFilePath,
          mimeType: "",
        },
      })
    }
  }

  onProgress?.({ progress: 100, loaded: totalSize, total: totalSize })

  return AppResultFactory.success({ failed })
}

const prepareSerialUploadFiles = async (
  files: TransferFileFromPathEntry[],
  abortController: AbortController
): Promise<{
  files: PreparedSerialUploadFileEntry[]
  failed: FailedTransferItem[]
}> => {
  const preparedFiles: PreparedSerialUploadFileEntry[] = []
  const failed: FailedTransferItem[] = []

  for (const file of files) {
    if (abortController.signal.aborted) {
      failed.push({
        id: file.id,
        errorName: ReadFileTransferMetadataErrorName.Aborted,
      })
      continue
    }

    const transferDataResponse = await AppFileSystem.readFile({
      ...file.source.fileLocation,
      encoding: "base64",
    })
    if (!transferDataResponse.ok) {
      failed.push({
        id: file.id,
        errorName: ReadFileTransferMetadataErrorName.FileReadError,
      })
      continue
    }

    const transferData = transferDataResponse.data

    const crc32Response = await AppFileSystem.calculateFileCrc32({
      data: transferData,
    })
    if (!crc32Response.ok) {
      failed.push({
        id: file.id,
        errorName: ReadFileTransferMetadataErrorName.Crc32Error,
      })
      continue
    }

    const sourceFileStatsResponse = await AppFileSystem.fileStats(
      file.source.fileLocation
    )
    if (!sourceFileStatsResponse.ok) {
      failed.push({
        id: file.id,
        errorName: ReadFileTransferMetadataErrorName.FileReadError,
      })
      continue
    }

    preparedFiles.push({
      ...file,
      transferData,
      transferFileSize: transferData.length,
      sourceFileSize: sourceFileStatsResponse.data.size,
      crc32: crc32Response.data,
    })
  }

  return { files: preparedFiles, failed }
}
