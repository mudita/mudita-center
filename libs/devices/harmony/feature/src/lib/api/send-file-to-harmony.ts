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
import { HarmonySerialPort } from "devices/harmony/adapters"
import { AppFileSystemScopeOptions } from "app-utils/models"
import { AppFileSystem } from "app-utils/renderer"

interface Params {
  device: Harmony
  fileLocation: AppFileSystemScopeOptions
  targetPath: string
  onProgress?: (progress: number) => void
  abortController?: AbortController
}

export const sendFileToHarmony = async ({
  device,
  fileLocation,
  targetPath,
  onProgress,
  abortController,
}: Params) => {
  onProgress?.(0)

  // Get file stats and calculate CRC32
  const fileStats = await AppFileSystem.fileStats(fileLocation)
  if (!fileStats.ok) {
    throw new Error(`Failed to get file stats: ${fileStats.error}`)
  }
  const crc32 = await AppFileSystem.calculateFileCrc32(fileLocation)
  if (!crc32.ok) {
    throw new Error(`Failed to calculate file CRC32: ${crc32.error}`)
  }
  if (abortController?.signal.aborted) {
    throw new Error("File transfer aborted")
  }

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
      retries: 2,
    },
  })

  if (abortController?.signal.aborted) {
    throw new Error("File transfer aborted")
  }

  if (!preSendResponse.ok || !preSendResponse.body) {
    throw new Error(
      `Failed to initiate file transfer: ${preSendResponse.status}`
    )
  }
  const { txID, chunkSize } = preSendResponse.body as HarmonyPreSendFileResponse

  // Read and send file in chunks
  const chunksCount = Math.ceil(fileStats.data.size / chunkSize)

  for (let i = 0; i < chunksCount; i++) {
    if (abortController?.signal.aborted) {
      throw new Error("File transfer aborted")
    }
    const chunkData = await AppFileSystem.readFileChunk({
      ...fileLocation,
      chunkSize,
      chunkNo: i,
    })
    if (!chunkData.ok) {
      throw new Error(`Failed to read file chunk: ${chunkData.error}`)
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
      throw new Error(
        `Failed to send file chunk ${i + 1}/${chunksCount}: ${chunkResponse.status}`
      )
    }
    const progress = Math.floor(((i + 1) / chunksCount) * 100)
    onProgress?.(progress)
  }

  return true
}
