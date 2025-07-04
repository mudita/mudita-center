/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { AppUpdateAvailability, AppUpdaterReducer } from "app-updater/models"
import {
  setAppUpdateAvailability,
  setAppUpdaterCheckingForUpdate,
  setAppUpdaterCurrentVersion,
  setAppUpdaterDownloadProgress,
  setAppUpdaterError,
  setAppUpdaterModalsOpened,
  setAppUpdaterNewVersionInfo,
  setAppUpdaterSilentMode,
} from "./app-updater.actions"

const initialState: AppUpdaterReducer = {
  forceUpdate: false,
  silentMode: false,
  isCheckingForUpdate: false,
  updateAvailability: AppUpdateAvailability.Unknown,
  modalsOpened: false,
  currentVersion: undefined,
  newVersion: undefined,
  downloadProgress: undefined,
  updateError: undefined,
}

export const appUpdaterReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAppUpdaterCurrentVersion, (state, action) => {
    state.currentVersion = action.payload
  })
  builder.addCase(setAppUpdaterNewVersionInfo, (state, action) => {
    state.newVersion = action.payload.version
    state.forceUpdate = action.payload.forced
  })
  builder.addCase(setAppUpdateAvailability, (state, action) => {
    state.updateAvailability = action.payload
  })
  builder.addCase(setAppUpdaterDownloadProgress, (state, action) => {
    state.downloadProgress = action.payload
  })
  builder.addCase(setAppUpdaterCheckingForUpdate, (state, action) => {
    state.isCheckingForUpdate = action.payload
  })
  builder.addCase(setAppUpdaterSilentMode, (state, action) => {
    state.silentMode = action.payload
  })
  builder.addCase(setAppUpdaterError, (state, action) => {
    state.updateError = action.payload
  })
  builder.addCase(setAppUpdaterModalsOpened, (state, action) => {
    state.modalsOpened = action.payload
  })
})
