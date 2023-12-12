/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceState } from "Core/device"

export const deviceStateSelector: Selector<ReduxRootState, DeviceState> = (
  state
) => state.device
