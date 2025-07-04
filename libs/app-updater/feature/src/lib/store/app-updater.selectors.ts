/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppStore } from "app-store/models"
import { AppUpdateAvailability } from "app-updater/models"

export const selectAppUpdaterCurrentVersion = createSelector(
  (state: AppStore) => state.appUpdater,
  (state) => {
    return state.currentVersion
  }
)

export const selectAppUpdaterNewVersion = createSelector(
  (state: AppStore) => state.appUpdater,
  (state) => {
    return state.newVersion
  }
)

export const selectAppUpdaterForceUpdate = createSelector(
  (state: AppStore) => state.appUpdater,
  (state) => {
    return state.forceUpdate
  }
)

export const selectAppUpdaterUpdateAvailable = createSelector(
  selectAppUpdaterNewVersion,
  selectAppUpdaterCurrentVersion,
  (newVersion, currentVersion) => {
    return Boolean(newVersion) && newVersion !== currentVersion
  }
)

export const selectAppUpdaterDownloadProgress = createSelector(
  (state: AppStore) => state.appUpdater,
  (state) => {
    return state.downloadProgress
  }
)

export enum ModalsState {
  None,
  CheckingForUpdate,
  UpdateAvailable,
  UpdateNotAvailable,
  DownloadInProgress,
  Error,
}

export const selectAppUpdaterModalsState = createSelector(
  (state: AppStore) => state.appUpdater,
  ({
    modalsOpened,
    isCheckingForUpdate,
    silentMode,
    downloadProgress,
    updateAvailability,
    updateError,
  }) => {
    if (!modalsOpened) {
      return ModalsState.None
    }
    if (isCheckingForUpdate && !silentMode) {
      return ModalsState.CheckingForUpdate
    }
    if (updateError && !silentMode) {
      return ModalsState.Error
    }
    if (downloadProgress !== undefined && downloadProgress >= 0) {
      return ModalsState.DownloadInProgress
    }
    if (updateAvailability === AppUpdateAvailability.Available) {
      return ModalsState.UpdateAvailable
    }
    if (
      updateAvailability === AppUpdateAvailability.NotAvailable &&
      !silentMode
    ) {
      return ModalsState.UpdateNotAvailable
    }

    return ModalsState.None
  }
)
