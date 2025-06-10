/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceImageColor, DeviceImageType } from "./device-image"

export interface DeviceMetadata {
  id: string
  name: string
  image: {
    type: DeviceImageType
    color?: DeviceImageColor
  }
  serialNumber?: string
  recoveryMode?: boolean
  locked?: boolean
}
