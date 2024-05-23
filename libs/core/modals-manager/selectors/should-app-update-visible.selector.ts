/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getAppInitializationStatus } from "Core/app-initialization/selectors/get-app-initialization-status.selector"
import { modalsManagerStateSelector } from "Core/modals-manager"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"

export const shouldAppUpdateVisibleSelector = createSelector(
  modalsManagerStateSelector,
  getAppInitializationStatus,
  ({ appUpdateFlowShow }, appInitializationStatus): boolean => {
    return (
      appUpdateFlowShow &&
      appInitializationStatus === AppInitializationStatus.Initialized
    )
  }
)
