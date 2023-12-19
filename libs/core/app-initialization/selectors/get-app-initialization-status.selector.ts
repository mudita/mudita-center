/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { appInitializationState } from "Core/app-initialization/selectors/app-initialization-state.selector"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"

export const getAppInitializationStatus = createSelector(
  appInitializationState,
  ({ appInitializationStatus }): AppInitializationStatus =>
    appInitializationStatus
)
