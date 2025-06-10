/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceImageColor,
  DeviceImageType,
  DeviceMetadata,
} from "devices/common/models"
import { SerialPortDeviceType } from "app-serialport/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { Device } from "./use-devices"
import { useDeviceConfig } from "./use-device-config"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"

const messages = defineMessages({
  harmony1: {
    id: "general.devices.harmony.name",
  },
  harmony2: {
    id: "general.devices.harmony2.name",
  },
  pure: {
    id: "general.devices.pure.name",
  },
  kompakt: {
    id: "general.devices.kompakt.name",
  },
})

const queryFn = (
  device?: Device,
  config?: Awaited<ReturnType<typeof useDeviceConfig.queryFn>>
): DeviceMetadata | null => {
  if (!config || !device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    if (config.serialNumber?.toLowerCase().startsWith("kom")) {
      let color: DeviceImageColor
      switch (config.variant) {
        case "black":
          color = DeviceImageColor.Black
          break
        case "white":
          color = DeviceImageColor.White
          break
        case "gray":
          color = DeviceImageColor.Gray
          break
        default:
          color = DeviceImageColor.Black
      }
      return {
        id: device.path,
        name: formatMessage(messages.kompakt),
        image: {
          type: DeviceImageType.Kompakt,
          color,
        },
        serialNumber: config.serialNumber,
      }
    }
  }
  if (device.deviceType === SerialPortDeviceType.HarmonyMsc) {
    return {
      id: device.path,
      name: formatMessage(messages.harmony1),
      image: {
        type: DeviceImageType.HarmonyMsc,
      },
      serialNumber: undefined,
      recoveryMode: true,
    }
  }
  // TODO: Add support for Pure and Harmony 1 and 2 (no MSC mode)
  return null
}

export const useDeviceMetadata = (device?: Device) => {
  const { data: deviceConfig } = useDeviceConfig(device)

  return useQuery({
    queryKey: devicesQueryKeys.deviceMetadata(device?.path),
    queryFn: () => queryFn(device, deviceConfig),
    retry: 3,
    retryDelay: 250,
    enabled: Boolean(deviceConfig),
  })
}
useDeviceMetadata.queryKey = devicesQueryKeys.deviceMetadata
