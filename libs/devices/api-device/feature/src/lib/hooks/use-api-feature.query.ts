/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  ApiFeatureConfigResponse,
  ApiFeatureDataResponse,
  McOverview,
  McOverviewConfigResponse,
  McOverviewDataResponse,
} from "devices/api-device/models"
import { useQuery } from "@tanstack/react-query"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { getFeatureData } from "../api/get-feature-data"
import { SerialPortDeviceId } from "app-serialport/models"
import { getFeatureConfig } from "../api/get-feature-config"
import { mapOverviewFeature } from "../views-mappers/overview-mapper"

type QueryFnResult<F extends string> = F extends "mc-overview"
  ? McOverview
  : {
      data: Exclude<ApiFeatureDataResponse, McOverviewDataResponse>
      config: Exclude<ApiFeatureConfigResponse, McOverviewConfigResponse>
    }

const queryFn = async <F extends string>(feature: F, device?: ApiDevice) => {
  if (!device) {
    return null
  }
  const { body: data } = await getFeatureData(device, feature)
  const { body: config } = await getFeatureConfig(device, feature)

  switch (feature) {
    case "mc-overview":
      return mapOverviewFeature(
        data as McOverviewDataResponse,
        config as McOverviewConfigResponse
      )
    default:
      return { data, config } as QueryFnResult<F>
  }
}

export const useApiFeatureQuery = <F extends string>(
  feature: F,
  device?: ApiDevice
) => {
  return useQuery({
    queryKey: useApiFeatureQuery.queryKey(feature, device?.id),
    queryFn: () => queryFn<F>(feature, device),
    enabled: !!device,
  })
}
useApiFeatureQuery.queryKey = (feature: string, id?: SerialPortDeviceId) => {
  return apiDeviceQueryKeys.feature(feature, id)
}
