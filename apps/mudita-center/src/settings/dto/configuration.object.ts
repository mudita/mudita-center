/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"

export interface Configuration {
  centerVersion: string
  productVersions: Record<DeviceType, string>
}
