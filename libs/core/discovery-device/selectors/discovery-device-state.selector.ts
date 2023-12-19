/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DiscoveryDeviceState } from "Core/discovery-device/reducers/discovery-device.interface"

export const discoveryDeviceState = (
  state: ReduxRootState
): DiscoveryDeviceState => state.discoveryDevice
