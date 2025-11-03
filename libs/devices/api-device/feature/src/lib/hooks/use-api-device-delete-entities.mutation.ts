/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation } from "@tanstack/react-query"
import { ApiDevice, DeleteEntitiesRequest } from "devices/api-device/models"
import { deleteEntities } from "../api/delete-entities"

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
  return useMutation({
    mutationFn: (payload: DeleteEntitiesRequest) => mutationFn(payload, device),
  })
}

useApiDeviceDeleteEntitiesMutation.mutationFn = mutationFn
