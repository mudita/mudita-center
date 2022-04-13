/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackRequest } from "App/analytic-data-tracker/requests"
import { HarmonyDeviceData, PureDeviceData } from "App/device"
import { DeviceType } from "@mudita/pure"
import { TrackEvent } from "App/analytic-data-tracker/services"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"

export enum TrackOsUpdateState {
  Start,
  Success,
  Fail,
}

export interface TrackOsUpdateOptions {
  fromOsVersion: Partial<PureDeviceData | HarmonyDeviceData>["osVersion"]
  toOsVersion: Partial<PureDeviceData | HarmonyDeviceData>["osVersion"]
  deviceType: DeviceType
  state: TrackOsUpdateState
}

const getPureTrackEventCategoryByState = (
  state: TrackOsUpdateState
): TrackEventCategory => {
  if (state === TrackOsUpdateState.Start) {
    return TrackEventCategory.PureUpdateStart
  } else if (state === TrackOsUpdateState.Success) {
    return TrackEventCategory.PureUpdateSuccess
  } else {
    return TrackEventCategory.PureUpdateFail
  }
}

const getHarmonyTrackEventCategoryByState = (
  state: TrackOsUpdateState
): TrackEventCategory => {
  if (state === TrackOsUpdateState.Start) {
    return TrackEventCategory.HarmonyUpdateStart
  } else if (state === TrackOsUpdateState.Success) {
    return TrackEventCategory.HarmonyUpdateSuccess
  } else {
    return TrackEventCategory.HarmonyUpdateFail
  }
}

export const trackOsUpdate = async (
  options: TrackOsUpdateOptions
): Promise<void> => {
  const { fromOsVersion, toOsVersion, state, deviceType } = options
  let event: TrackEvent = {
    e_a: toOsVersion,
    e_n: fromOsVersion,
  }

  if (deviceType === DeviceType.MuditaHarmony) {
    event = {
      ...event,
      e_c: getHarmonyTrackEventCategoryByState(state),
    }
  }

  if (deviceType === DeviceType.MuditaPure) {
    event = {
      ...event,
      e_c: getPureTrackEventCategoryByState(state),
    }
  }

  await trackRequest(event)
}
