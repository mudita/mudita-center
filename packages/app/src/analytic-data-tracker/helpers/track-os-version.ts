/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackRequest } from "App/analytic-data-tracker/requests"
import { HarmonyDeviceData, PureDeviceData } from "App/device"
import { DeviceType } from "@mudita/pure"
import { trackEvent } from "App/analytic-data-tracker/services"
import { TrackEventCategory, TrackEventDimension } from "App/analytic-data-tracker/constants"
import { getTrackOsVersionCache, TrackOsVersionCache } from "App/analytic-data-tracker/helpers/track-os-version-cache"

export interface TrackOsVersionOptions {
  osVersion: Partial<PureDeviceData | HarmonyDeviceData>["osVersion"]
  serialNumber: Partial<PureDeviceData | HarmonyDeviceData>["serialNumber"]
  deviceType: DeviceType
}

export const trackOsVersion = async (
  options: TrackOsVersionOptions
): Promise<void> => {
  let event: trackEvent = {}
  const cache: TrackOsVersionCache = getTrackOsVersionCache()

  const { osVersion, serialNumber, deviceType } = options

  if (osVersion === cache.osVersion && serialNumber === cache.serialNumber) {
    return
  }

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

  await trackRequest(event)

  cache.osVersion = osVersion ?? ""
  cache.serialNumber = serialNumber ?? ""
}
