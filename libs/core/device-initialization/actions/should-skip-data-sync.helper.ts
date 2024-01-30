/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PureDeviceData } from "Core/device"

export const corruptedPureOSVersions = ["1.5.1"]

export const shouldSkipDataSync = (deviceData: PureDeviceData): boolean => {
  const { osVersion } = deviceData
  const baseVersion = String(osVersion).split("-")[0]

  return corruptedPureOSVersions.includes(baseVersion)
}
