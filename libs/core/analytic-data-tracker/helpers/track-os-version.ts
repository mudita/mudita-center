/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { trackUniqueRequest } from "Core/analytic-data-tracker/requests"
import { HarmonyDeviceData, PureDeviceData } from "Core/device"
import { TrackEvent } from "Core/analytic-data-tracker/types"
import { TrackEventCategory } from "Core/analytic-data-tracker/constants"

export interface TrackOsVersionOptions {
  osVersion: Partial<PureDeviceData | HarmonyDeviceData>["osVersion"]
  serialNumber: Partial<PureDeviceData | HarmonyDeviceData>["serialNumber"]
  deviceType: DeviceType
}

export const trackOsVersion = async (
  options: TrackOsVersionOptions
): Promise<void> => {
  let event: TrackEvent = {}
  const { osVersion, serialNumber, deviceType } = options

  if (serialNumber !== undefined && serialNumber !== "") {
    event = {
      ...event,
      _id: serialNumber,
    }
  }

  if (deviceType === DeviceType.MuditaHarmony) {
    event = {
      ...event,
      e_c: TrackEventCategory.HarmonyVersion,
      e_a: osVersion,
    }
  }

  if (deviceType === DeviceType.MuditaPure) {
    event = {
      ...event,
      e_c: TrackEventCategory.PureVersion,
      e_a: osVersion,
    }
  }

  await trackUniqueRequest(event)
}
