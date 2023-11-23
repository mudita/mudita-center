/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { deviceStateSelector } from "App/device/selectors/device-state.selector"
import { ConnectionState, DeviceState } from "App/device"

export const getDeviceState = createSelector<
  ReduxRootState,
  DeviceState,
  ConnectionState
>(deviceStateSelector, ({ state }) => {
  return state
})
