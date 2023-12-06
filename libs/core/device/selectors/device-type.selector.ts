/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "@reduxjs/toolkit"
import { DeviceType } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const deviceTypeSelector: Selector<ReduxRootState, DeviceType | null> = (
  state
) => state.device?.deviceType
