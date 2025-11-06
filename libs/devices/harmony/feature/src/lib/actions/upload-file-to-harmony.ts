/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
  HarmonyPreSendFileResponse,
} from "devices/harmony/models"
import { AppFileSystemGuardOptions } from "app-utils/models"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { AppFileSystem } from "app-utils/renderer"
import {
  createProgressTracker,
  TransferProgressHandler,
} from "../utils/progress-tracker"

export interface Params {
  device: Harmony
  fileLocation: AppFileSystemGuardOptions
  targetPath: string
  onProgress?: TransferProgressHandler
  abortController?: AbortController
}

export enum UploadFileToHarmonyError {
  FileReadError = "FileReadError",
  Crc32Error = "Crc32Error",
  PreSendError = "PreSendError",
  ChunkReadError = "ChunkReadError",
  ChunkSendError = "ChunkSendError",
  Aborted = "Aborted",
}

export const uploadFileToHarmony = async ({
  device,
  fileLocation,
  targetPath,
  onProgress,
  abortController,
}: Params) => {
  // Get file stats and calculate CRC32
  const fileStats = await AppFileSystem.fileStats(fileLocation)
  if (!fileStats.ok) {
    throw UploadFileToHarmonyError.FileReadError
  }
  const crc32 = await AppFileSystem.calculateFileCrc32(fileLocation)
  if (!crc32.ok) {
    throw UploadFileToHarmonyError.Crc32Error
  }
  if (abortController?.signal.aborted) {
    throw UploadFileToHarmonyError.Aborted
  }

  onProgress?.({
    progress: 0,
    loaded: 0,
    total: fileStats.data.size,
  })

  // Initiate file transfer to obtain transaction ID and chunk size
  const preSendResponse = await HarmonySerialPort.request(device, {
    endpoint: HarmonyEndpointNamed.FileSystem,
    method: HarmonyMethodNamed.Put,
    body: {
      fileSize: fileStats.data.size,
      fileCrc32: crc32.data,
      fileName: targetPath,
    },
    options: {
      retries: 1,
    },
  })

  if (abortController?.signal.aborted) {
    throw UploadFileToHarmonyError.Aborted
  }

  if (!preSendResponse.ok || !preSendResponse.body) {
    throw UploadFileToHarmonyError.PreSendError
  }
  const { txID, chunkSize } = preSendResponse.body as HarmonyPreSendFileResponse

  const totalFileSize = fileStats.data.size
  const chunksCount = Math.ceil(totalFileSize / chunkSize)
  const progressTracker = createProgressTracker({
    chunksCount,
    totalFileSize,
  })
  let chunkStartTime = Date.now()

  // Read and send file in chunks
  for (let i = 0; i < chunksCount; i++) {
    if (abortController?.signal.aborted) {
      throw UploadFileToHarmonyError.Aborted
    }
    const chunkData = await AppFileSystem.readFileChunk({
      ...fileLocation,
      chunkSize,
      chunkNo: i,
    })
    if (!chunkData.ok) {
      throw UploadFileToHarmonyError.ChunkReadError
    }
    const chunkResponse = await HarmonySerialPort.request(device, {
      endpoint: HarmonyEndpointNamed.FileSystem,
      method: HarmonyMethodNamed.Put,
      body: {
        txID,
        chunkNo: i + 1,
        data: chunkData.data,
      },
      options: {
        retries: 1,
      },
    })

    if (!chunkResponse.ok) {
      throw UploadFileToHarmonyError.ChunkSendError
    }
    // Calculate progress, speed, and estimated time left
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

  return true
}
