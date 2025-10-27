/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  DeleteEntitiesRequest,
  DeleteEntitiesResponse207,
} from "devices/api-device/models"
import { ApiDeviceSerialPort, Response } from "devices/api-device/adapters"

const CHUNK_SIZE = 500

const createChunks = <T>(items: T[], size: number) => {
  const chunkCount = Math.ceil(items.length / size)
  return Array.from({ length: chunkCount }, (_unused, index) =>
    items.slice(index * size, (index + 1) * size)
  )
}

type DeleteEndpoint = "ENTITIES_DATA"
type DeleteMethod = "DELETE"
type DeleteEntitiesResponse = Response<DeleteEndpoint, DeleteMethod>

function hasFailedIds(value: unknown): value is { failedIds: string[] } {
  if (value === null || typeof value !== "object") return false
  const candidate = value as { failedIds?: unknown }
  return (
    Array.isArray(candidate.failedIds) &&
    candidate.failedIds.every((id) => typeof id === "string")
  )
}

function is207(
  response: DeleteEntitiesResponse
): response is DeleteEntitiesResponse & {
  ok: true
  status: 207
  body: Omit<DeleteEntitiesResponse207, "_status">
} {
  return response.ok && response.status === 207 && hasFailedIds(response.body)
}

const deleteEntitiesRequest = (
  device: ApiDevice,
  { entityType, ids }: DeleteEntitiesRequest
): Promise<DeleteEntitiesResponse> => {
  return ApiDeviceSerialPort.request(device, {
    endpoint: "ENTITIES_DATA",
    method: "DELETE",
    body: { entityType, ids },
  })
}

export const deleteEntities = async (
  device: ApiDevice,
  { entityType, ids }: DeleteEntitiesRequest
) => {
  const failedIds: string[] = []

  for (const idsChunk of createChunks(ids, CHUNK_SIZE)) {
    try {
      const response = await deleteEntitiesRequest(device, {
        entityType,
        ids: idsChunk,
      })

      if (!response.ok) {
        failedIds.push(...idsChunk)
        continue
      }

      if (response.status === 200) {
        continue
      }

      if (is207(response) && response.body.failedIds.length > 0) {
        failedIds.push(...response.body.failedIds)
        continue
      }

      failedIds.push(...idsChunk)
    } catch {
      failedIds.push(...idsChunk)
    }
  }

  if (failedIds.length === 0) {
    return { ok: true, status: 200, body: {} }
  }
  if (failedIds.length === ids.length) {
    return { ok: false, status: 404, body: {} }
  }
  return { ok: true, status: 207, body: { failedIds } }
}
