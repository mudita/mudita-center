/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { backupStateSelector } from "Core/backup"
import { isActiveDeviceSet } from "Core/device-manager/selectors/is-active-device-set.selector"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"
import { State } from "Core/core/constants"

export const isActiveDeviceProcessingSelector = createSelector(
  isActiveDeviceSet,
  backupStateSelector,
  updateStateSelector,
  (activeDeviceSet, backupState, updateOsState): boolean => {
    if (!activeDeviceSet) {
      return false
    } else {
      return (
        updateOsState.updateOsState === State.Loading ||
        backupState.restoringState === State.Loading ||
        backupState.backingUpState === State.Loading
      )
    }
  }
)
