/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { useQuery } from "@tanstack/react-query"
import { SerialPortDeviceId } from "app-serialport/models"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { getEntitiesConfig } from "../api/get-entities-config"

const queryFn = async (device?: ApiDevice, entityType?: string) => {
  if (!device || !entityType) {
    throw new Error(
      "Device and entity type are required to fetch entities config"
    )
  }
  const response = await getEntitiesConfig(device, entityType)
  if (response.ok) {
    return response.body
  }
  throw response.error
}

export const useApiEntitiesConfigQuery = (
  entityType?: string,
  device?: ApiDevice
) =>
  useQuery({
    queryKey: useApiEntitiesConfigQuery.queryKey(entityType, device?.id),
    queryFn: () => queryFn(device, entityType),
    enabled: !!device && !!entityType,
  })

useApiEntitiesConfigQuery.queryKey = (
  entityType?: string,
  id?: SerialPortDeviceId
) => {
  return apiDeviceQueryKeys.entitiesConfig(entityType, id)
}
useApiEntitiesConfigQuery.queryFn = queryFn
