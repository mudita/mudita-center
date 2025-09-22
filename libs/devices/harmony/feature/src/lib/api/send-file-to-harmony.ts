/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sum } from "lodash"
import {
  Harmony,
  HarmonyEndpointNamed,
  HarmonyMethodNamed,
  HarmonyPreSendFileResponse,
} from "devices/harmony/models"
import { AppFileSystemGuardOptions } from "app-utils/models"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { AppFileSystem } from "app-utils/renderer"

interface Params {
  device: Harmony
  fileLocation: AppFileSystemGuardOptions
  targetPath: string
  onProgress?: (progress: {
    // Percentage of file sent [%]
    progress: number
    // Sent data size [B]
    loaded: number
    // Total file size [B]
    total: number
    // Average speed [B/s]
    rate?: number
    // Estimated time left [s]
    estimated?: number
  }) => void
  abortController?: AbortController
}

export enum SendFileToHarmonyError {
  FileReadError = "FileReadError",
  Crc32Error = "Crc32Error",
  PreSendError = "PreSendError",
  ChunkReadError = "ChunkReadError",
  ChunkSendError = "ChunkSendError",
  Aborted = "Aborted",
}

export const sendFileToHarmony = async ({
  device,
  fileLocation,
  targetPath,
  onProgress,
  abortController,
}: Params) => {
  // Get file stats and calculate CRC32
  const fileStats = await AppFileSystem.fileStats(fileLocation)
  if (!fileStats.ok) {
    throw SendFileToHarmonyError.FileReadError
  }
  const crc32 = await AppFileSystem.calculateFileCrc32(fileLocation)
  if (!crc32.ok) {
    throw SendFileToHarmonyError.Crc32Error
  }
  if (abortController?.signal.aborted) {
    throw SendFileToHarmonyError.Aborted
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
    throw SendFileToHarmonyError.Aborted
  }

  if (!preSendResponse.ok || !preSendResponse.body) {
    throw SendFileToHarmonyError.PreSendError
  }
  const { txID, chunkSize } = preSendResponse.body as HarmonyPreSendFileResponse

  const totalFileSize = fileStats.data.size
  const chunksCount = Math.ceil(totalFileSize / chunkSize)
  const avgSpeeds: number[] = []
  let chunkStartTime = Date.now()

  // Read and send file in chunks
  for (let i = 0; i < chunksCount; i++) {
    if (abortController?.signal.aborted) {
      throw SendFileToHarmonyError.Aborted
    }
    const chunkData = await AppFileSystem.readFileChunk({
      ...fileLocation,
      chunkSize,
      chunkNo: i,
    })
    if (!chunkData.ok) {
      throw SendFileToHarmonyError.ChunkReadError
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
      throw SendFileToHarmonyError.ChunkSendError
    }
    // Calculate progress, speed, and estimated time left
    const progressPercentage = Math.floor(((i + 1) / chunksCount) * 100)
    const totalBytesSent = Math.min((i + 1) * chunkSize, totalFileSize)
    const bytesLeft = totalFileSize - totalBytesSent
    const currentChunkTime = (Date.now() - chunkStartTime) / 1000
    chunkStartTime = Date.now()
    const currentSpeed = Math.round(chunkSize / currentChunkTime)
    avgSpeeds.push(currentSpeed)
    if (avgSpeeds.length > 20) {
      avgSpeeds.shift()
    }
    const averageSpeed = Math.round(sum(avgSpeeds) / avgSpeeds.length)
    const estimatedTimeLeft = Math.ceil(bytesLeft / averageSpeed)

    onProgress?.({
      progress: progressPercentage,
      loaded: totalBytesSent,
      total: totalFileSize,
      rate: averageSpeed,
      estimated: estimatedTimeLeft,
    })
  }

  return true
}
