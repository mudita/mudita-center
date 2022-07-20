/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DeviceState } from "App/device"

export const deviceStateSelector: Selector<ReduxRootState, DeviceState> = (
  state
) => state.device
