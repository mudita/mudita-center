/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Device,
  DeviceState,
} from "Core/device-manager/reducers/device-manager.interface"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"

export const mapToDevice = (properties: DeviceBaseProperties): Device => {
  return {
    ...properties,
    state: DeviceState.Connected,
  }
}
