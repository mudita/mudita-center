/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getAppInitializationStatus } from "Core/app-initialization/selectors/get-app-initialization-status.selector"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"

export const isInitializationAppInProgress = createSelector(
  getAppInitializationStatus,
  (appInitializationStatus): boolean => {
    return appInitializationStatus === AppInitializationStatus.Initializing
  }
)
