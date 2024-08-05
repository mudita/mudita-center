/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "core-device/models"
import { DeviceType } from "device-protocol/models"

export const DeviceNames = {
  Pure: "Pure",
  Harmony: "Harmony",
  Harmony1: "Harmony 1",
  Harmony2: "Harmony 2",
  Kompakt: "Kompakt",
  UnknownDevice: "Unknown device",
} as const

export const getDeviceTypeName = (
  deviceType: DeviceType,
  caseColour: CaseColour = CaseColour.Black
): string => {
  if (deviceType === DeviceType.MuditaPure) {
    return DeviceNames.Pure
  }

  if (deviceType === DeviceType.MuditaHarmonyMsc) {
    return DeviceNames.Harmony
  }

  if (
    deviceType === DeviceType.MuditaHarmony &&
    caseColour === CaseColour.Gray
  ) {
    return DeviceNames.Harmony1
  }

  if (
    deviceType === DeviceType.MuditaHarmony &&
    caseColour === CaseColour.Black
  ) {
    return DeviceNames.Harmony2
  }

  if (deviceType === DeviceType.APIDevice) {
    return DeviceNames.Kompakt
  }

  return DeviceNames.UnknownDevice
}
