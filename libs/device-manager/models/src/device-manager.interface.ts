/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceId } from "Core/device/constants/device-id"

export interface DeviceManagerState {
  activeDeviceId: DeviceId | undefined
  selectDeviceDrawerOpen: boolean
}
