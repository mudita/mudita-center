/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getDiscoveryStatus } from "Core/discovery-device/selectors/get-discovery-status"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

export const isDiscoveryDeviceInProgress = createSelector(
  getDiscoveryStatus,
  (discoveryStatus): boolean => {
    return discoveryStatus === DiscoveryStatus.Discovering
  }
)
