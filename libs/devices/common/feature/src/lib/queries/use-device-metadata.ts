/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Device,
  DeviceImageColor,
  DeviceImageType,
  DeviceMetadata,
} from "devices/common/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { useQuery } from "@tanstack/react-query"
import { devicesQueryKeys } from "./devices-query-keys"
import { useDeviceConfig } from "./use-device-config"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { HarmonySerialPort } from "devices/harmony/adapters"
// import { PureSerialPort } from "devices/pure/adapters"

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
    return null
  }
  if (HarmonySerialPort.isCompatible(device)) {
    const isHarmony2 = config.caseColour === "black"
    return {
      id: device.path,
      name: isHarmony2
        ? formatMessage(messages.harmony2)
        : formatMessage(messages.harmony1),
      image: {
        type: isHarmony2 ? DeviceImageType.Harmony2 : DeviceImageType.Harmony1,
      },
      serialNumber: config.serialNumber,
    }
  }
  // if (PureSerialPort.isCompatible(device)) {
  //   return {
  //     id: device.path,
  //     name: formatMessage(messages.pure),
  //     image: {
  //       type: DeviceImageType.Pure,
  //       color:
  //         config.caseColour === "black"
  //           ? DeviceImageColor.Black
  //           : DeviceImageColor.Gray,
  //     },
  //     serialNumber: config.serialNumber,
  //     recoveryMode: config.recoveryMode,
  //   }
  // }
  // TODO: Add support for Harmony in MSC mode
  // if (device.deviceType === SerialPortDeviceType.HarmonyMsc) {
  //   return {
  //     id: device.path,
  //     name: formatMessage(messages.harmony1),
  //     image: {
  //       type: DeviceImageType.HarmonyMsc,
  //     },
  //     serialNumber: undefined,
  //     recoveryMode: true,
  //   }
  // }
  return null
}

const placeholderData = (device?: Device): DeviceMetadata | null => {
  if (!device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    if (device.serialNumber?.toLowerCase().startsWith("kom")) {
      return {
        id: device?.path || "",
        name: formatMessage(messages.kompakt),
        image: {
          type: DeviceImageType.Kompakt,
        },
        serialNumber: device.serialNumber || "",
      }
    }
  }
  if (HarmonySerialPort.isCompatible(device)) {
    return {
      id: device?.path || "",
      name: formatMessage(messages.harmony1),
      image: {
        type: DeviceImageType.HarmonyMsc,
      },
      serialNumber: device.serialNumber || "",
    }
  }
  // if (PureSerialPort.isCompatible(device)) {
  //   return {
  //     id: device?.path || "",
  //     name: formatMessage(messages.pure),
  //     image: {
  //       type: DeviceImageType.Pure,
  //       color: DeviceImageColor.Gray,
  //     },
  //     serialNumber: device.serialNumber || "",
  //   }
  // }
  return null
}

export const useDeviceMetadata = (device?: Device) => {
  const { data: deviceConfig } = useDeviceConfig(device)

  return useQuery({
    queryKey: devicesQueryKeys.deviceMetadata(device?.path),
    queryFn: () => queryFn(device, deviceConfig),
    placeholderData: () => placeholderData(device),
    retry: 3,
    retryDelay: 250,
    enabled: Boolean(deviceConfig),
  })
}
useDeviceMetadata.queryKey = devicesQueryKeys.deviceMetadata
