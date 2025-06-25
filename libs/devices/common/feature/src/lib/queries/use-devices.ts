/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { uniqBy } from "lodash"
import { devicesQueryKeys } from "./devices-query-keys"
import { AppSerialPort } from "app-serialport/renderer"
import { Device } from "devices/common/models"
import { SerialPortDeviceType } from "app-serialport/models"

const queryFn = async () => {
  const devices = await AppSerialPort.getCurrentDevices()

  const list = uniqBy(
    devices.map(
      ({ path, deviceType, serialNumber, productId, deviceSubtype }) => ({
        path,
        deviceType,
        serialNumber,
        productId,
        deviceSubtype,
      })
    ),
    "path"
  ) as Device[]

  return list.reverse().sort((a, b) => {
    if (a.deviceType === SerialPortDeviceType.ApiDevice) return -1
    if (b.deviceType === SerialPortDeviceType.ApiDevice) return 1
    return 0
  })
}

export const useDevices = () => {
  return useQuery<Device[]>({
    queryKey: devicesQueryKeys.all,
    queryFn,
  })
}
useDevices.queryKey = devicesQueryKeys.all
