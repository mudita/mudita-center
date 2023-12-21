/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"
import { State } from "Core/core/constants"

export const isInitializationDeviceInProgress = createSelector(
  updateStateSelector,
  (updateOsState): boolean => {
    return (
      updateOsState.needsForceUpdate ||
      updateOsState.forceUpdateState === State.Loading ||
      updateOsState.updateOsState === State.Loading
    )
  }
)
