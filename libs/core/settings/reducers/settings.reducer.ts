/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { SettingsState } from "Core/settings/reducers/settings.interface"
import {
  loadSettings,
  setLatestVersion,
  setOsBackupLocation,
  setSettings,
  toggleTethering,
  toggleApplicationUpdateAvailable,
  togglePrivacyPolicyAccepted,
  setCheckingForUpdate,
  setUserHasSerialPortAccess,
} from "Core/settings/actions"
import {
  setCheckingForUpdateFailed,
  skipAvailableUpdate,
} from "Core/settings/actions/base.action"
import { setUSBAccessRestartRequired } from "Core/settings/actions/set-usb-access-restart-needed.action"

export const initialState: SettingsState = {
  settingsSchemaVersion: 1,
  applicationId: "",
  lowestSupportedVersions: undefined,
  currentVersion: undefined,
  latestVersion: undefined,
  osBackupLocation: "",
  osDownloadLocation: "",
  language: "",
  ignoredCrashDumps: [],
  diagnosticSentTimestamp: 0,
  privacyPolicyAccepted: undefined,
  neverConnected: false,
  tray: false,
  autostart: false,
  tethering: false,
  updateRequired: false,
  updateAvailable: undefined,
  updateAvailableSkipped: undefined,
  loaded: false,
  loading: false,
  checkingForUpdate: false,
  checkingForUpdateFailed: false,
  usbAccessRestartRequired: false,
}

export const settingsReducer = createReducer<SettingsState>(
  initialState,
  (builder) => {
    builder
      .addCase(loadSettings.pending, (state) => {
        state.loaded = false
        state.loading = true
      })

      .addCase(setSettings, (state, action): SettingsState => {
        return {
          ...state,
          ...action.payload,
          loaded: true,
          loading: false,
        }
      })

      .addCase(setLatestVersion, (state, action) => {
        state.latestVersion = action.payload
      })

      .addCase(toggleTethering.fulfilled, (state, action) => {
        state.tethering = action.payload
      })

      .addCase(toggleApplicationUpdateAvailable, (state, action) => {
        state.updateAvailable = action.payload
      })

      .addCase(togglePrivacyPolicyAccepted.fulfilled, (state, action) => {
        state.privacyPolicyAccepted = action.payload
      })

      .addCase(setOsBackupLocation.fulfilled, (state, action) => {
        state.osBackupLocation = action.payload
      })

      .addCase(setUSBAccessRestartRequired.fulfilled, (state, action) => {
        state.usbAccessRestartRequired = action.payload
      })

      .addCase(setCheckingForUpdate, (state, action) => {
        state.checkingForUpdate = action.payload
      })
      .addCase(setCheckingForUpdateFailed, (state, action) => {
        state.checkingForUpdateFailed = action.payload
      })
      .addCase(setUserHasSerialPortAccess, (state, action) => {
        state.userHasSerialPortAccess = action.payload
      })
      .addCase(skipAvailableUpdate, (state) => {
        state.updateAvailableSkipped = true
      })
  }
)
