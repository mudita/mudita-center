/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  getApiDeviceConfig,
  GetApiConfigResponse,
} from "devices/api-device/feature"
import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { Device } from "devices/common/models"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { getHarmonyInfo, GetHarmonyInfoResponse } from "devices/harmony/feature"
import { ApiDevice } from "devices/api-device/models"
import { Harmony } from "devices/harmony/models"

type QueryFnResponse<D extends Device | undefined> = Promise<
  D extends ApiDevice
    ? GetApiConfigResponse["body"]
    : D extends Harmony
      ? GetHarmonyInfoResponse["body"]
      : null
>

const queryFn = async <D extends Device | undefined>(
  device?: D
): QueryFnResponse<D> => {
  if (!device) {
    return null as unknown as QueryFnResponse<D>
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    const config = await getApiDeviceConfig(device)
    if (config.ok) {
      return config.body as unknown as QueryFnResponse<D>
    } else {
      throw config.status
    }
  }
  if (HarmonySerialPort.isCompatible(device)) {
    const config = await getHarmonyInfo(device)
    if (config.ok) {
      return config.body as unknown as QueryFnResponse<D>
    } else {
      throw config.status
    }
  }
  return null as unknown as QueryFnResponse<D>
}

export const useDeviceConfig = (device?: Device) => {
  return useQuery({
    queryKey: devicesQueryKeys.deviceConfig(device?.path),
    queryFn: () => queryFn(device as ApiDevice | Harmony | undefined),
    retry: 10,
    retryDelay: 250,
    enabled: Boolean(device),
  })
}
useDeviceConfig.queryKey = devicesQueryKeys.deviceConfig
useDeviceConfig.queryFn = queryFn
