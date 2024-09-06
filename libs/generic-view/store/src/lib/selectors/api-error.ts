/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ApiError } from "device/models"

export const selectApiErrors = createSelector(
  (state: ReduxRootState) => state.genericViews.apiErrors,
  (apiErrors) => apiErrors
)

export const selectApiError = createSelector(
  selectApiErrors,
  (state: ReduxRootState, deviceId: string) => deviceId,
  (state: ReduxRootState, deviceId: string, apiError: ApiError) => apiError,
  (apiErrors, deviceId, apiError) => apiErrors[deviceId]?.[apiError]
)
