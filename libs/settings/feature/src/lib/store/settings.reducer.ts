/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setCheckingForUpdate,
  setCheckingForUpdateFailed,
  toggleApplicationUpdateAvailable,
  setLatestVersion,
  setCurrentVersion,
} from "./settings.actions"

export interface SettingsState {
  updateAvailable: boolean
  checkingForUpdate: boolean
  checkingForUpdateFailed: boolean
  latestVersion?: string
  currentVersion?: string
}

const initialState: SettingsState = {
  updateAvailable: false,
  checkingForUpdate: false,
  checkingForUpdateFailed: false,
  latestVersion: undefined,
  currentVersion: undefined,
}

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCheckingForUpdate, (state, action) => {
      state.checkingForUpdate = action.payload
    })
    .addCase(setCheckingForUpdateFailed, (state, action) => {
      state.checkingForUpdateFailed = action.payload
    })
    .addCase(toggleApplicationUpdateAvailable, (state, action) => {
      state.updateAvailable = action.payload
    })
    .addCase(setLatestVersion, (state, action) => {
      state.latestVersion = action.payload
    })
    .addCase(setCurrentVersion, (state, action) => {
      state.currentVersion = action.payload
    })
})
