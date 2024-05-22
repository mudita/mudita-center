/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"
import { AppInitializationEvent } from "Core/app-initialization/constants/event.constant"

export const setAppInitializationStatus = createAction<AppInitializationStatus>(
  AppInitializationEvent.SetAppInitializationStatus
)
