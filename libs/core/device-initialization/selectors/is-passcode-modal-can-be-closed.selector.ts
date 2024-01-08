/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"

export const isPasscodeModalCanBeClosedSelector = createSelector(
  updateStateSelector,
  isActiveDeviceProcessingSelector,
  (updateOsState, activeDeviceProcessing): boolean => {
    return !updateOsState.needsForceUpdate || !activeDeviceProcessing
  }
)
