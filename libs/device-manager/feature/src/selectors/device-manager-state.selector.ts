/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceManagerState } from "device-manager/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const deviceManagerState = (state: ReduxRootState): DeviceManagerState =>
  state.deviceManager
