/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiDevice, DeleteEntitiesRequest } from "devices/api-device/models"
import { deleteEntities } from "../api/delete-entities"
import { useApiEntitiesDataQuery } from "./use-api-entities-data.query"
import { FileManagerFile } from "devices/common/ui"
import { cloneDeep } from "lodash"

const mutationFn = async (
  payload: DeleteEntitiesRequest,
  device?: ApiDevice
) => {
  if (!device) {
    throw new Error("No device provided for useApiDeviceDeleteEntitiesMutation")
  }

  const response = await deleteEntities(device, payload)

  if (response.ok) {
    return response.body
  }

  throw response.status
}

export const useApiDeviceDeleteEntitiesMutation = (device?: ApiDevice) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: DeleteEntitiesRequest) => mutationFn(payload, device),
    onSuccess: async ({ failedIds }, { entityType, ids }) => {
      // Remove successfully deleted entities from the cache
      queryClient.setQueryData(
        useApiEntitiesDataQuery.queryKey(entityType, device?.id),
        (oldData: FileManagerFile[]) => {
          return cloneDeep(oldData).filter((file) => {
            const intendedForDeletion = ids.includes(file.id)
            const deletionFailed = failedIds?.includes(file.id)
            return !intendedForDeletion || deletionFailed
          })
        }
      )
    },
  })
}

useApiDeviceDeleteEntitiesMutation.mutationFn = mutationFn
