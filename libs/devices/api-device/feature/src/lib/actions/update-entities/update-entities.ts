/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { patchEntityData } from "../../api/patch-entity-data"
import { ApiDevice, EntityData } from "devices/api-device/models"

interface Params {
  device: ApiDevice
  entities: (EntityData & {
    entityId: string
    entityType: string
  })[]
  onProgress?: (progress: number) => void
  abortController?: AbortController
}

export const updateEntities = async ({
  device,
  entities,
  onProgress,
  abortController,
}: Params) => {
  const failedIds: string[] = []
  onProgress?.(0)

  for (let i = 0; i < entities.length; i++) {
    if (abortController?.signal.aborted) {
      break
    }
    const { entityId, ...data } = entities[i]
    try {
      const response = await patchEntityData(device, {
        entityType: data.entityType,
        entityId,
        data,
      })
      if (!response.ok) {
        throw new Error("Failed to update entity data")
      }
    } catch {
      failedIds.push(entityId)
    } finally {
      const progress = Math.floor(((i + 1) / entities.length) * 100)
      onProgress?.(progress)
    }
  }

  onProgress?.(100)

  return { failedIds }
}
