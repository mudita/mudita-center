/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { discoveryDeviceState } from "Core/discovery-device/selectors/discovery-device-state.selector"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

export const getDiscoveryStatus = createSelector(
  discoveryDeviceState,
  ({ discoveryStatus }): DiscoveryStatus => discoveryStatus
)
