/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  ApiFeatureConfigResponse,
  ApiFeatureDataResponse,
  McFileManagerConfigResponse,
  McFileManagerDataResponse,
  McOverviewConfigResponse,
  McOverviewDataResponse,
} from "devices/api-device/models"
import {
  useQueries,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { apiDeviceQueryKeys } from "./api-device-query-keys"
import { getFeatureData } from "../api/get-feature-data"
import { SerialPortDeviceId } from "app-serialport/models"
import { getFeatureConfig } from "../api/get-feature-config"
import { mapOverviewFeature } from "../views-mappers/overview-mapper"

type FeatureMap = {
  "mc-overview": {
    data: McOverviewDataResponse
    config: McOverviewConfigResponse
  }
  "mc-file-manager-internal": {
    data: McFileManagerDataResponse
    config: McFileManagerConfigResponse
  }
  "mc-file-manager-external": {
    data: McFileManagerDataResponse
    config: McFileManagerConfigResponse
  }
}

export type FeatureId = keyof FeatureMap

type DefaultFeatureResult = {
  data: Exclude<
    ApiFeatureDataResponse,
    McOverviewDataResponse | McFileManagerDataResponse
  >
  config: Exclude<
    ApiFeatureConfigResponse,
    McOverviewConfigResponse | McFileManagerConfigResponse
  >
}

type QueryFnResult<F extends string> = F extends FeatureId
  ? FeatureMap[F]
  : DefaultFeatureResult

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
    case "mc-file-manager-internal":
    case "mc-file-manager-external":
      return {
        data: data as McFileManagerDataResponse,
        config: config as McFileManagerConfigResponse,
      } as QueryFnResult<F>
    default:
      return {
        data: data as DefaultFeatureResult["data"],
        config: config as DefaultFeatureResult["config"],
      } as QueryFnResult<F>
  }
}

export function useApiFeatureQuery(
  feature: "mc-file-manager-internal" | "mc-file-manager-external",
  device?: ApiDevice,
  options?: Omit<UseQueryOptions, "queryFn" | "queryKey">
): UseQueryResult<FeatureMap["mc-file-manager-internal"]>
export function useApiFeatureQuery<FEATURE extends string>(
  feature: FEATURE,
  device?: ApiDevice,
  options?: Omit<UseQueryOptions, "queryFn" | "queryKey">
) {
  return useQuery({
    queryKey: useApiFeatureQuery.queryKey(feature, device?.id),
    queryFn: () => queryFn<FEATURE>(feature, device),
    enabled: !!device,
    ...options,
  })
}
useApiFeatureQuery.queryKey = (feature: string, id?: SerialPortDeviceId) => {
  return apiDeviceQueryKeys.feature(feature, id)
}

export function useApiFeaturesQuery<FEATURE extends string>(
  features: FEATURE[],
  device?: ApiDevice,
  options?: Omit<UseQueryOptions, "queryFn" | "queryKey">
) {
  return useQueries({
    queries: features.map((feature) => {
      return {
        queryKey: useApiFeatureQuery.queryKey(feature, device?.id),
        queryFn: () => queryFn(feature, device),
        enabled: !!device,
        ...options,
      }
    }),
    combine: (results) => {
      const isLoading = results.some((r) => r.isLoading)
      const isError = results.some((r) => r.isError)

      const data = Object.fromEntries(
        features.map((feature, i) => [feature, results[i]?.data ?? []])
      ) as Record<string, QueryFnResult<FEATURE>>

      const refetch = () => results.forEach((r) => r.refetch?.())

      return {
        data,
        isLoading,
        isError,
        refetch,
      }
    },
  })
}
