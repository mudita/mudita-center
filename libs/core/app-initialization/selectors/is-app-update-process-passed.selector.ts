/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { settingsStateSelector } from "Core/settings/selectors"
import { shouldAppUpdateFlowVisible } from "Core/app-initialization/selectors/should-app-update-flow-visible.selector"

export const isAppUpdateProcessPassed = createSelector(
  settingsStateSelector,
  shouldAppUpdateFlowVisible,
  (
    {
      updateAvailable,
      updateAvailableSkipped,
      checkingForUpdateFailed,
      updateRequired,
    },
    appUpdateFlowVisible
  ): boolean => {
    return (
      !appUpdateFlowVisible ||
      (updateAvailableSkipped === undefined &&
        updateAvailable === undefined &&
        checkingForUpdateFailed)
    )
  }
)
