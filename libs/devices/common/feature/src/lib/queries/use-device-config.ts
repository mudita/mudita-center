/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  GetApiConfigOkResponse,
  getApiDeviceConfig,
} from "devices/api-device/feature"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { HarmonySerialPort } from "devices/harmony/adapters"
import {
  getHarmonyInfo,
  GetHarmonyInfoOkResponse,
} from "devices/harmony/feature"
import { ApiDevice } from "devices/api-device/models"
import { Harmony } from "devices/harmony/models"
// import { Pure } from "devices/pure/models"
// import { getPureInfo, GetPureInfoOkResponse } from "devices/pure/feature"
// import { PureSerialPort } from "devices/pure/adapters"
import { Device } from "devices/common/models"

const queryFn = async <D extends Device>(device?: D) => {
  if (!device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    const config = await getApiDeviceConfig(device)
    if (config.ok) {
      return config.body
    } else {
      throw config.status
    }
  }
  if (HarmonySerialPort.isCompatible(device)) {
    const config = await getHarmonyInfo(device)
    if (config.ok) {
      return config.body
    } else {
      throw config.status
    }
  }
  // if (PureSerialPort.isCompatible(device)) {
  //   const config = await getPureInfo(device)
  //   if (config.ok) {
  //     return config.body
  //   } else {
  //     throw config.status
  //   }
  // }
  return null
}

type QueryFnResponse<D> = D extends ApiDevice
  ? GetApiConfigOkResponse["body"]
  : D extends Harmony
    ? GetHarmonyInfoOkResponse["body"]
    : // :
      // D extends Pure
      //   ? GetPureInfoOkResponse["body"]
      null

export const useDeviceConfig = <D extends Device>(
  device?: D,
  options?: Omit<
    UseQueryOptions<QueryFnResponse<D>>,
    "queryFn" | "queryKey" | "enabled" | "retry" | "retryDelay"
  >
) => {
  return useQuery({
    queryKey: devicesQueryKeys.deviceConfig(device?.path),
    queryFn: () => queryFn(device) as Promise<QueryFnResponse<D>>,
    retry: 10,
    retryDelay: 250,
    enabled: Boolean(device),
    ...options,
  })
}
useDeviceConfig.queryKey = devicesQueryKeys.deviceConfig
useDeviceConfig.queryFn = <D extends Device>(
  device?: D
) => {
  return queryFn<D>(device) as Promise<QueryFnResponse<D>>
}
