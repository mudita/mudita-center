/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import moment from "moment"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { deviceStateSelector } from "App/device/selectors/device-state.selector"
import { DeviceState, PureDeviceData } from "App/device"

export const getLeftTimeSelector = createSelector<
  ReduxRootState,
  DeviceState,
  number | undefined
>(deviceStateSelector, ({ data }) => {
  if (data === null) {
    return undefined
  }

  const { timeLeftToNextAttempt, phoneLockTime } = data as PureDeviceData

  if (phoneLockTime === undefined && timeLeftToNextAttempt === undefined) {
    return undefined
  }

  if (phoneLockTime !== undefined && timeLeftToNextAttempt === undefined) {
    return moment.unix(phoneLockTime).diff(moment(), "s")
  } else {
    return timeLeftToNextAttempt
  }
})
