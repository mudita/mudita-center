/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { ConnectionState } from "App/device"
import { getDeviceState } from "App/device/selectors/get-device-state.selector"

export const isConnectionErrorStateSelector = createSelector<
  ReduxRootState,
  ConnectionState,
  boolean
>(getDeviceState, (state) => {
  return state === ConnectionState.Error
})
