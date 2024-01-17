/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerState } from "Core/device-manager/reducers/device-manager.interface"

export const deviceManagerState = (state: ReduxRootState): DeviceManagerState =>
  state.deviceManager
