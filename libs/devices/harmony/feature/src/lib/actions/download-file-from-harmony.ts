/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createProgressTracker } from "app-utils/common"
import {
  Harmony,
  HarmonyDownloadFileChunkResponse,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
  HarmonyPreDownloadFileResponse,
} from "devices/harmony/models"
import {
  AppFileSystemGuardOptions,
  TransferProgressHandler,
} from "app-utils/models"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { AppFileSystem } from "app-utils/renderer"

export interface Params {
  device: Harmony
  fileLocation: AppFileSystemGuardOptions
  targetPath: string
  onProgress?: TransferProgressHandler
  abortController?: AbortController
}

export enum DownloadFileFromHarmonyError {
  Crc32Error = "Crc32Error",
  PreSendError = "PreSendError",
  ChunkWriteError = "ChunkWriteError",
  ChunkDownloadError = "ChunkDownloadError",
  Aborted = "Aborted",
}

export const downloadFileFromHarmony = async ({
  device,
  fileLocation,
  targetPath,
  onProgress,
  abortController,
}: Params) => {
  const preDownloadResponse = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.FileSystem,
    method: HarmonyMethodNamed.Get,
    body: {
      fileName: targetPath,
    },
    options: {
      retries: 1,
    },
  })

  if (abortController?.signal.aborted) {
    throw DownloadFileFromHarmonyError.Aborted
  }

  if (!preDownloadResponse.ok || !preDownloadResponse.body) {
    throw DownloadFileFromHarmonyError.PreSendError
  }

  const { rxID, fileSize, chunkSize } =
    preDownloadResponse.body as HarmonyPreDownloadFileResponse

  const totalFileSize = fileSize
  const chunksCount = Math.ceil(totalFileSize / chunkSize)
  const progressTracker = createProgressTracker({
    chunksCount,
    totalFileSize,
  })
  let chunkStartTime = Date.now()
  let fileCrc32: string | undefined

  for (let i = 0; i < chunksCount; i++) {
    if (abortController?.signal.aborted) {
      throw DownloadFileFromHarmonyError.Aborted
    }

    const chunkResponse = await HarmonySerialPort.request(device, {
      endpoint: HarmonyEndpointNamed.FileSystem,
      method: HarmonyMethodNamed.Get,
      body: {
        rxID,
        chunkNo: i + 1,
      },
      options: {
        retries: 1,
      },
    })

    if (!chunkResponse.ok) {
      throw DownloadFileFromHarmonyError.ChunkDownloadError
    }

    fileCrc32 = (chunkResponse.body as HarmonyDownloadFileChunkResponse)
      .fileCrc32
    const chunkData = await AppFileSystem.writeFileChunk({
      ...fileLocation,
      chunkSize,
      chunkNo: i,
      data: Buffer.from(
        (chunkResponse.body as HarmonyDownloadFileChunkResponse).data,
        "base64"
      ),
    })

    if (!chunkData.ok) {
      throw DownloadFileFromHarmonyError.ChunkWriteError
    }

    const currentChunkTime = Date.now() - chunkStartTime
    chunkStartTime = Date.now()

    onProgress?.(
      progressTracker.update({
        i,
        chunkSize,
        currentChunkTime,
      })
    )
  }

  if (!fileCrc32) {
    throw DownloadFileFromHarmonyError.Crc32Error
  }

  const localCrc32 = await AppFileSystem.calculateFileCrc32(fileLocation)

  if (!localCrc32.ok) {
    throw DownloadFileFromHarmonyError.Crc32Error
  }

  if (localCrc32.data !== fileCrc32) {
    // TODO: handle CRC32 mismatch during logs / crash dumps download
    console.log("CRC32 mismatch", {
      deviceCrc32: fileCrc32,
      localCrc32: localCrc32.data,
    })
    // throw DownloadFileFromHarmonyError.Crc32Error
  }
}
