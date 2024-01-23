/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DiscoveryDeviceEvent } from "Core/discovery-device/constants/event.constant"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

export const setDiscoveryStatus = createAction<DiscoveryStatus>(
  DiscoveryDeviceEvent.SetDiscoveryStatus
)
