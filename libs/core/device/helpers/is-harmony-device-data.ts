/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyDeviceData,
  KompaktDeviceData,
  PureDeviceData,
} from "Core/device"

export const isHarmonyDeviceData = (
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData> | null
): data is HarmonyDeviceData => {
  if (data === null) {
    return false
  } else return (data as HarmonyDeviceData).onboardingState !== undefined
}
