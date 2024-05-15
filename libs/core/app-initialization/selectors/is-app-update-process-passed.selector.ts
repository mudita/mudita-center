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

const selectAppUpdateFlowPassed = createSelector(
  settingsStateSelector,
  shouldAppUpdateFlowVisible,
  ({ updateAvailable }, appUpdateFlowVisible): boolean => {
    return updateAvailable !== undefined && !appUpdateFlowVisible
  }
)

export const isAppUpdateProcessPassed = createSelector(
  selectNoDataAboutUpdateAvaible,
  selectAppUpdateFlowPassed,
  (noDataAboutUpdateAvaible, appUpdateFlowPassed): boolean => {
    return appUpdateFlowPassed || noDataAboutUpdateAvaible
  }
)
