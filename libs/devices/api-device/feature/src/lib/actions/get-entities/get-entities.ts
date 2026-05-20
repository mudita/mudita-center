/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { clamp } from "lodash"
import {
  ExecuteTransferResult,
  isExecuteTransferSuccessDataWithFiles,
} from "devices/common/models"
import { ApiDevice, EntityData } from "devices/api-device/models"
import { getEntitiesData } from "../../api/get-entities-data"
import { serialDownloadFiles } from "../serial-download-files/serial-download-files"

interface GetEntitiesParams {
  device: ApiDevice
  entitiesType: string
  onProgress?: (progress: number) => void
  abortController: AbortController
}

export const getEntities = async ({
  device,
  entitiesType,
  onProgress,
  abortController,
}: GetEntitiesParams) => {
  let entitiesDataProgress = 0
  let fileDownloadProgress = 0

  const updateProgress = () => {
    const progress = clamp(
      Math.round(entitiesDataProgress * 0.9 + fileDownloadProgress * 0.1),
      0,
      100
    )
    onProgress?.(progress)
  }

  onProgress?.(0)

  let entityResponse = await getEntitiesData(device, entitiesType)
  let filePath: string | undefined = undefined

  if (!entityResponse.ok) {
    console.error(entityResponse.error)
    throw new Error("Failed to get entities data")
  }

  while (entityResponse.status === 202) {
    if (abortController.signal.aborted) {
      throw new Error("Entities data retrieval aborted")
    }
    entitiesDataProgress = entityResponse.body.progress || 0
    updateProgress()

    await new Promise((resolve) => setTimeout(resolve, 500))
    if (abortController.signal.aborted) {
      throw new Error("Entities data retrieval aborted")
    }
    entityResponse = await getEntitiesData(device, entitiesType)

    if (!entityResponse.ok) {
      throw new Error("Failed to get entities data")
    }
  }

  if (entityResponse.status === 200) {
    entitiesDataProgress = 100
    updateProgress()
    filePath = entityResponse.body.filePath
  }

  if (!filePath) {
    throw new Error("No file path received for entities data")
  }

  const transferResult = await serialDownloadFiles({
    device,
    files: [
      {
        id: filePath,
        source: { type: "path", path: filePath },
        target: { type: "memory" },
      },
    ],
    onProgress: ({ progress }) => {
      fileDownloadProgress = progress
      updateProgress()
    },
    abortController,
  })

  const file = extractSingleFileFromTransferResult(transferResult)
  const buffer = normalizeToBuffer(file)
  const entities = decodeAndParseJson<{ data: EntityData[] }>(buffer)

  onProgress?.(100)

  return entities.data
}

export const extractSingleFileFromTransferResult = (
  result: ExecuteTransferResult
): string | Buffer => {
  if (!result.ok) {
    throw new Error("Failed to download entities data file from device")
  }

  const data = result.data

  if (!isExecuteTransferSuccessDataWithFiles(data)) {
    throw new Error("Downloaded data is in unexpected format")
  }

  if (!data.files?.length) {
    throw new Error("No files returned from device")
  }

  return data.files[0]
}

const normalizeToBuffer = (file: string | Buffer | Uint8Array): Buffer => {
  if (typeof file === "string") {
    return Buffer.from(file, "base64")
  }
  return Buffer.from(file)
}

const decodeAndParseJson = <T>(buffer: Buffer): T => {
  let text: string

  try {
    text = buffer.toString("utf-8")
  } catch {
    throw new Error(`Entities: failed to decode UTF-8`)
  }

  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error(`Entities: failed to parse JSON`)
  }
}
