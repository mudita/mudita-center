/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, EntityData } from "devices/api-device/models"
import { postEntityData } from "../../api/post-entity-data"
import { ContactToImportAsEntity } from "devices/common/models"

type Data = {
  entityType: "contacts"
  data: ContactToImportAsEntity[]
}

export type SendEntitiesAsDataParams = Data & {
  device: ApiDevice
  abortController: AbortController
  onProgress?: (progress: number) => void
}

export const sendEntitiesAsData = async ({
  device,
  entityType,
  data,
  onProgress,
  abortController,
}: SendEntitiesAsDataParams): Promise<{
  failedEntities?: EntityData[]
}> => {
  const failedEntities: EntityData[] = []
  onProgress?.(0)

  try {
    for (let i = 0; i < data.length; i++) {
      if (abortController.signal.aborted) {
        break
      }
      const entity = data[i]
      const response = await postEntityData(device, {
        entityType,
        data: {
          ...entity,
          entityType,
        },
      })
      if (!response.ok) {
        failedEntities.push(entity)
      }
      const progress = Math.floor(((i + 1) / data.length) * 100)
      onProgress?.(progress)
    }
    if (failedEntities.length > 0) {
      return { failedEntities }
    }
    return {}
  } catch (error) {
    if (abortController.signal.aborted) {
      throw abortController.signal
    }
    throw error
  } finally {
    onProgress?.(100)
  }
}
