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

export const selectUpdateDownloadProgress = createSelector(
  selectSettingsState,
  (state) => state.updateDownloadProgress
)

export const selectUpdateInstallProgress = createSelector(
  selectSettingsState,
  (state) => state.updateInstallProgress
)

export const selectCheckingForUpdateFailed = createSelector(
  selectSettingsState,
  (state) => state.checkingForUpdateFailed
)

export const selectUpdateAvailableModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateAvailableModalOpen
)

export const selectUpdateNotAvailableModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateNotAvailableModalOpen
)

export const selectUpdateDownloadProgressModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateDownloadProgressModalOpen
)

export const selectUpdateDownloadedModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateDownloadedModalOpen
)

export const selectUpdateInstallProgressModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateInstallProgressModalOpen
)

export const selectUpdateCompletedModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateCompletedModalOpen
)

export const selectUpdateFailedModalOpen = createSelector(
  selectSettingsState,
  (state) => state.updateFailedModalOpen
)
