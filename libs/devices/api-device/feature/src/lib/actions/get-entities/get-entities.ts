/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntityData } from "devices/api-device/models"
import { getEntitiesData } from "../../api/get-entities-data"
import { downloadFiles } from "../download-files/download-files"
import { clamp } from "lodash"

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
      console.error(entityResponse.error)
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

  const [response] = await downloadFiles({
    device,
    sourceFilePaths: [filePath],
    onProgress: (progress) => {
      fileDownloadProgress = progress
      updateProgress()
    },
    abortController,
  })

  try {
    const decodedData = Buffer.from(response, "base64").toString("utf-8")
    const entities = JSON.parse(decodedData) as { data: EntityData[] }

    if (!entities || !entities.data) {
      throw new Error("Failed to parse entities data")
    }

    onProgress?.(100)

    return entities.data
  } catch (error) {
    console.error("Error parsing entities data:", error)
    throw new Error("Failed to parse entities data")
  }
}
