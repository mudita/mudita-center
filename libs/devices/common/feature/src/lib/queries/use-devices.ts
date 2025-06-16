/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { uniqBy } from "lodash"
import { devicesQueryKeys } from "./devices-query-keys"
import { AppSerialPort } from "app-serialport/renderer"
import { Device } from "devices/common/models"

const queryFn = async () => {
  const devices = await AppSerialPort.getCurrentDevices()

  return uniqBy(
    devices.map(({ path, deviceType }) => ({
      path,
      deviceType,
    })),
    "path"
  ) as Device[]
}

export const useDevices = () => {
  return useQuery<Device[]>({
    queryKey: devicesQueryKeys.all,
    queryFn,
  })
}
useDevices.queryKey = devicesQueryKeys.all
