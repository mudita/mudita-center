/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { settingsStateSelector } from "Core/settings/selectors"
import { shouldAppUpdateFlowVisible } from "Core/app-initialization/selectors/should-app-update-flow-visible.selector"

const selectNoDataAboutUpdateAvaible = createSelector(
  settingsStateSelector,
  ({
    updateAvailable,
    updateAvailableSkipped,
    checkingForUpdateFailed,
  }): boolean => {
    return (
      updateAvailableSkipped === undefined &&
      updateAvailable === undefined &&
      checkingForUpdateFailed
    )
  }
)

export const isAppUpdateProcessPassed = createSelector(
  selectNoDataAboutUpdateAvaible,
  shouldAppUpdateFlowVisible,
  (noDataAboutUpdateAvaible, appUpdateFlowVisible): boolean => {
    return !appUpdateFlowVisible || noDataAboutUpdateAvaible
  }
)
