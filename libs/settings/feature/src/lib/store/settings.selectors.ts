/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"

export const selectSettingsState = (state: AppState) => state.settings

export const selectCheckingForUpdate = createSelector(
  selectSettingsState,
  (state) => state.checkingForUpdate
)

export const selectUpdateAvailable = createSelector(
  selectSettingsState,
  (state) => state.updateAvailable
)

export const selectLatestVersion = createSelector(
  selectSettingsState,
  (state) => state.latestVersion
)

export const selectCurrentVersion = createSelector(
  selectSettingsState,
  (state) => state.currentVersion
)

export const selectCheckingForUpdateFailed = createSelector(
  selectSettingsState,
  (state) => state.checkingForUpdateFailed
)
