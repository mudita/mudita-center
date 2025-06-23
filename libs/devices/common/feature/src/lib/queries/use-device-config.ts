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
import { ApiDevice, ApiDeviceErrorType } from "devices/api-device/models"
import { Harmony, HarmonyErrorType } from "devices/harmony/models"
import { Pure, PureErrorType } from "devices/pure/models"
import {
  getPureInfo,
  GetPureInfoOkResponse,
  getPureLockStatus,
} from "devices/pure/feature"
import { PureSerialPort } from "devices/pure/adapters"
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
  if (PureSerialPort.isCompatible(device)) {
    const [lockStatus, config] = await Promise.all([
      getPureLockStatus(device),
      getPureInfo(device),
    ])
    if (config.ok && lockStatus.ok) {
      return config.body
    }
    throw lockStatus.status || config.status
  }
  return null
}

type QueryFnResponse<D> = D extends ApiDevice
  ? GetApiConfigOkResponse["body"]
  : D extends Harmony
    ? GetHarmonyInfoOkResponse["body"]
    : D extends Pure
      ? GetPureInfoOkResponse["body"]
      : null

type QueryErrorType<D> = D extends ApiDevice
  ? ApiDeviceErrorType
  : D extends Harmony
    ? HarmonyErrorType
    : D extends Pure
      ? PureErrorType
      : Error

export const useDeviceConfig = <D extends Device, E = QueryErrorType<D>>(
  device?: D,
  options?: Omit<UseQueryOptions<QueryFnResponse<D>, E>, "queryFn" | "queryKey">
) => {
  return useQuery<QueryFnResponse<D>, E>({
    queryKey: devicesQueryKeys.deviceConfig(device?.path),
    queryFn: () => queryFn(device) as Promise<QueryFnResponse<D>>,
    retry: (failureCount, error) => {
      if (PureSerialPort.isCompatible(device)) {
        return (
          error === PureErrorType.DeviceLocked ||
          error === PureErrorType.EulaNotAccepted ||
          error === PureErrorType.BatteryFlat
        )
      }
      return failureCount < 10
    },
    retryDelay: (_failureCount, error) => {
      if (PureSerialPort.isCompatible(device)) {
        return error === PureErrorType.BatteryFlat ? 5000 : 500
      }
      return 500
    },
    enabled: Boolean(device),
    refetchInterval: (query) => {
      if (PureSerialPort.isCompatible(device)) {
        return !query.state.error ? 5000 : undefined
      }
      return undefined
    },
    refetchIntervalInBackground: true,
    ...options,
  })
}
useDeviceConfig.queryKey = devicesQueryKeys.deviceConfig
useDeviceConfig.queryFn = <D extends Device>(device?: D) => {
  return queryFn<D>(device) as Promise<QueryFnResponse<D>>
}
