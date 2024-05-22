/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationState } from "Core/device-initialization/reducers/device-initialization.interface"

export const deviceInitializationState = (
  state: ReduxRootState
): DeviceInitializationState => state.deviceInitialization
