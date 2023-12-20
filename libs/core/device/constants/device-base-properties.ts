/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device"

export interface DeviceBaseProperties {
  id: string,
  path: string,
  serialNumber: string | undefined,
  deviceType: DeviceType,
}
