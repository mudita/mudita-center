/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackUniqueRequest } from "App/analytic-data-tracker/requests"
import { HarmonyDeviceData, PureDeviceData } from "App/device"
import { DeviceType } from "@mudita/pure"
import { TrackEvent } from "App/analytic-data-tracker/types"
import {
  TrackEventCategory,
  TrackEventDimension,
} from "App/analytic-data-tracker/constants"

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
      [TrackEventDimension.HarmonyVersion]: osVersion,
    }
  }

  if (deviceType === DeviceType.MuditaPure) {
    event = {
      ...event,
      e_c: TrackEventCategory.PureVersion,
      e_a: osVersion,
      [TrackEventDimension.PureVersion]: osVersion,
    }
  }

  await trackUniqueRequest(event)
}
