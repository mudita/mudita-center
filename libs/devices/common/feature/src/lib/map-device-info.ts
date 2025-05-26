/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceType } from "app-serialport/models"
import {
  AppDeviceInfo,
  DeviceImageColor,
  DeviceImageType,
} from "devices/common/models"
import { Device } from "devices/common/ui"
import { defineMessages, formatMessage } from "app-localize/utils"

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

export const mapDeviceInfo = (device: AppDeviceInfo): Device | undefined => {
  let name: string | undefined = undefined
  let type: DeviceImageType | undefined = undefined
  let color: DeviceImageColor | undefined = undefined
  let recoveryMode = false

  if (device.deviceType === SerialPortDeviceType.Harmony) {
    const isHarmony2 = device.metadata.caseColour === "black"
    name = formatMessage(isHarmony2 ? messages.harmony2 : messages.harmony1)
    type = isHarmony2 ? DeviceImageType.Harmony2 : DeviceImageType.Harmony1
    color = isHarmony2 ? DeviceImageColor.Black : DeviceImageColor.White
  }

  if (device.deviceType === SerialPortDeviceType.Pure) {
    name = formatMessage(messages.pure)
    type = DeviceImageType.Pure
    color =
      device.metadata.caseColour === "black"
        ? DeviceImageColor.Black
        : DeviceImageColor.Gray
  }

  if (device.deviceType === SerialPortDeviceType.HarmonyMsc) {
    name = formatMessage(messages.harmony1)
    type = DeviceImageType.HarmonyMsc
    recoveryMode = true
  }

  if (device.deviceType === SerialPortDeviceType.ApiDevice) {
    if (device.serialNumber?.toLowerCase()?.startsWith("kom")) {
      name = formatMessage(messages.kompakt)
      type = DeviceImageType.Kompakt

      switch (device.metadata.variant) {
        case "black":
          color = DeviceImageColor.Black
          break
        case "white":
          color = DeviceImageColor.White
          break
        case "gray":
          color = DeviceImageColor.Gray
          break
      }
    }
  }

  if (!name || !type) {
    return undefined
  }

  return {
    id: device.path,
    name,
    device: {
      type,
      color,
    },
    serialNumber: device.serialNumber,
    recoveryMode,
  }
}
