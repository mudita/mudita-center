/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { settingsStateSelector } from "Core/settings/selectors"

export const shouldAppUpdateFlowVisible = createSelector(
  settingsStateSelector,
  (settingsState): boolean => {
    const { updateAvailable, updateAvailableSkipped } = settingsState
    return updateAvailable === true && !updateAvailableSkipped
  }
)
