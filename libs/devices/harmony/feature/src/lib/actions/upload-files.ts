/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isArray, sumBy } from "lodash"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFileFromPathEntry,
} from "devices/common/models"
import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
  HarmonyPreSendFileResponse,
} from "devices/harmony/models"
import { AppFileSystemGuardOptions, AppResultFactory } from "app-utils/models"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { AppFileSystem, readFileTransferMetadataList } from "app-utils/renderer"
import { UploadFileToHarmonyError } from "./upload-files.types"

export interface UploadFilesFromPathsParams
  extends ExecuteTransferParams<Harmony> {
  files: TransferFileFromPathEntry[]
}

export const uploadFiles = async ({
  device,
  files,
  onProgress,
  abortController,
}: UploadFilesFromPathsParams): Promise<ExecuteTransferResult> => {
  const failed: FailedTransferItem[] = []
  const {
    files: fileEntryWithMetadata,
    failed: readFileTransferMetadataListFailed,
  } = await readFileTransferMetadataList(files, abortController)
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

    const preSendResponse = await HarmonySerialPort.request(device, {
      endpoint: HarmonyEndpointNamed.FileSystem,
      method: HarmonyMethodNamed.Put,
      body: {
        fileSize: file.fileSize,
        fileCrc32: file.crc32,
        fileName: file.target.path,
      },
      options: {
        retries: 1,
      },
    })

    if (abortController.signal.aborted) {
      failed.push({
        id: file.id,
        errorName: FailedTransferErrorName.Aborted,
      })

      continue
    }

    if (!preSendResponse.ok || !preSendResponse.body) {
      failed.push({
        id: file.id,
        errorName: UploadFileToHarmonyError.PreSendError,
      })

      continue
    }

    const { txID, chunkSize } =
      preSendResponse.body as HarmonyPreSendFileResponse

    const fileChunksCount = Math.ceil(file.fileSize / chunkSize)
    let uploadedWithinFile = 0

    for (let chunkNumber = 0; chunkNumber < fileChunksCount; chunkNumber++) {
      if (abortController.signal.aborted) {
        failed.push({
          id: file.id,
          errorName: FailedTransferErrorName.Aborted,
        })

        break
      }

      const fileChunkResponse = await AppFileSystem.readFileChunk({
        ...file.source.fileLocation,
        chunkNo: chunkNumber,
        chunkSize,
      })

      if (!fileChunkResponse.ok) {
        failed.push({
          id: file.id,
          errorName: UploadFileToHarmonyError.ChunkReadError,
        })

        break
      }

      const chunkResponse = await HarmonySerialPort.request(device, {
        endpoint: HarmonyEndpointNamed.FileSystem,
        method: HarmonyMethodNamed.Put,
        body: {
          txID,
          chunkNo: chunkNumber + 1,
          data: fileChunkResponse.data,
        },
        options: {
          retries: 1,
        },
      })

      if (!chunkResponse.ok) {
        failed.push({
          id: file.id,
          errorName: UploadFileToHarmonyError.ChunkSendError,
        })

        break
      }

      uploadedWithinFile = Math.min(
        file.fileSize,
        Math.floor(((chunkNumber + 1) * file.fileSize) / fileChunksCount)
      )
      const fileProgress = Math.floor(
        (uploadedWithinFile / file.fileSize) * 100
      )
      const loaded = uploadedTotalSize + uploadedWithinFile
      const progress = Math.floor((loaded / totalSize) * 100)

      onProgress?.({
        progress,
        loaded,
        total: totalSize,
        file: {
          id: file.id,
          name: getFileName(file.source.fileLocation),
          type: "file",
          size: file.fileSize,
          loaded: uploadedWithinFile,
          progress: fileProgress,
        },
      })
    }
    uploadedTotalSize += file.fileSize
  }

  onProgress?.({ progress: 100, loaded: totalSize, total: totalSize })

  return AppResultFactory.success({ failed })
}

function getFileName(fileLocation: AppFileSystemGuardOptions): string {
  const filePath = fileLocation.absolute
    ? fileLocation.fileAbsolutePath
    : fileLocation.scopeRelativePath
  const name = isArray(filePath) ? filePath.at(-1) : filePath?.split("/").pop()
  return name || "unknown"
}
