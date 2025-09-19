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
import { useDeviceConfigQuery } from "./use-device-config.query"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import { HarmonySerialPort } from "devices/harmony/adapters"
import { PureSerialPort } from "devices/pure/adapters"
import { HarmonyMscSerialPort } from "devices/harmony-msc/adapters"
import { SerialPortDeviceSubtype } from "app-serialport/models"

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
  config?: Awaited<ReturnType<typeof useDeviceConfigQuery.queryFn>>
): DeviceMetadata | null => {
  if (!config || !device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    if (device.deviceSubtype === SerialPortDeviceSubtype.Kompakt) {
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
        id: device.id,
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
      id: device.id,
      name: isHarmony2
        ? formatMessage(messages.harmony2)
        : formatMessage(messages.harmony1),
      image: {
        type: isHarmony2 ? DeviceImageType.Harmony2 : DeviceImageType.Harmony1,
      },
      serialNumber: config.serialNumber,
    }
  }
  if (PureSerialPort.isCompatible(device)) {
    return {
      id: device.id,
      name: formatMessage(messages.pure),
      image: {
        type: DeviceImageType.Pure,
        color:
          config.caseColour === "black"
            ? DeviceImageColor.Black
            : DeviceImageColor.Gray,
      },
      serialNumber: config.serialNumber,
      recoveryMode: config.recoveryMode,
    }
  }
  if (HarmonyMscSerialPort.isCompatible(device)) {
    return {
      id: device.id,
      name: formatMessage(messages.harmony1),
      image: {
        type: DeviceImageType.HarmonyMsc,
      },
      serialNumber: undefined,
      recoveryMode: true,
    }
  }
  return null
}

const placeholderData = (device?: Device): DeviceMetadata | null => {
  if (!device) {
    return null
  }
  if (ApiDeviceSerialPort.isCompatible(device)) {
    if (device.deviceSubtype === SerialPortDeviceSubtype.Kompakt) {
      return {
        id: device?.id || "",
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
      id: device?.id || "",
      name: formatMessage(messages.harmony1),
      image: {
        type: DeviceImageType.HarmonyMsc,
      },
      serialNumber: device.serialNumber || "",
    }
  }
  if (PureSerialPort.isCompatible(device)) {
    return {
      id: device?.id || "",
      name: formatMessage(messages.pure),
      image: {
        type: DeviceImageType.Pure,
        color: DeviceImageColor.Gray,
      },
      serialNumber: device.serialNumber || "",
    }
  }
  if (HarmonyMscSerialPort.isCompatible(device)) {
    return {
      id: device?.id || "",
      name: formatMessage(messages.harmony1),
      image: {
        type: DeviceImageType.HarmonyMsc,
      },
      serialNumber: undefined,
      recoveryMode: true,
    }
  }
  return null
}

export const useDeviceMetadataQuery = (device?: Device) => {
  const { data: deviceConfig } = useDeviceConfigQuery(device)

  return useQuery({
    queryKey: useDeviceMetadataQuery.queryKey(device?.id),
    queryFn: () => queryFn(device, deviceConfig),
    placeholderData: () => placeholderData(device),
    retry: 3,
    retryDelay: 250,
    enabled: Boolean(deviceConfig),
  })
}
useDeviceMetadataQuery.queryKey = devicesQueryKeys.deviceMetadata
