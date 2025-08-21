/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceStatus } from "devices/common/models"
import { useQueryClient } from "@tanstack/react-query"
import { useDeviceStatusQuery } from "../queries"
import { useCallback } from "react"
import { HarmonyMsc } from "devices/harmony-msc/models"

export const useHarmonyMscInitializer = (device: HarmonyMsc) => {
  const queryClient = useQueryClient()

  const setStatus = useCallback(
    (status: DeviceStatus) => {
      queryClient.setQueryData(
        useDeviceStatusQuery.queryKey(device.path),
        status
      )
    },
    [device.path, queryClient]
  )

  setStatus(DeviceStatus.Initialized)
}
