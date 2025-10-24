/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { ApiDevice } from "devices/api-device/models"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { readBackupsList } from "../actions/read-backups-list"

const queryFn = (device?: ApiDevice) => {
  if (!device || !device.vendorId || !device.productId) {
    return []
  }

  return readBackupsList({ device })
}

export const useApiDeviceBackupsQuery = (device?: ApiDevice) => {
  return useQuery({
    queryKey: useApiDeviceBackupsQuery.queryKey(device?.id),
    queryFn: () => queryFn(device),
    enabled: !!device,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
  })
}
useApiDeviceBackupsQuery.queryKey = apiDeviceQueryKeys.backups
