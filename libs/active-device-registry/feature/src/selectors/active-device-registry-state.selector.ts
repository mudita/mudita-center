/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ActiveDeviceRegistryState } from "active-device-registry/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const activeDeviceRegistryState = (state: ReduxRootState): ActiveDeviceRegistryState =>
  state.activeDeviceRegistry
