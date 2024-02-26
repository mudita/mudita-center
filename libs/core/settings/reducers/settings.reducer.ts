/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { ConversionFormat, Convert } from "Core/settings/constants"
import { SettingsState } from "Core/settings/reducers/settings.interface"
import {
  loadSettings,
  setLatestVersion,
  setOsBackupLocation,
  setOsUpdates,
  setSettings,
  setDiagnosticTimestamp,
  setIncomingCalls,
  setIncomingMessages,
  toggleTethering,
  toggleApplicationUpdateAvailable,
  toggleCollectionData,
  togglePrivacyPolicyAccepted,
  setConversionFormat,
  setConvert,
  setNonStandardAudioFilesConversion,
  setLowBattery,
  setCheckingForUpdate,
} from "Core/settings/actions"
import { deleteCollectingData } from "Core/settings/actions/delete-collecting-data.action"
import { setCheckingForUpdateFailed, skipAvailableUpdate } from "Core/settings/actions/base.action"
import { setUSBAccessRestartRequired } from "Core/settings/actions/set-usb-access-restart-needed.action"

export const initialState: SettingsState = {
  applicationId: "",
  lowestSupportedVersions: undefined,
  currentVersion: undefined,
  latestVersion: undefined,
  conversionFormat: ConversionFormat.WAV,
  convert: Convert.AlwaysAsk,
  osBackupLocation: "",
  osDownloadLocation: "",
  language: "",
  ignoredCrashDumps: [],
  diagnosticSentTimestamp: 0,
  collectingData: false,
  privacyPolicyAccepted: undefined,
  neverConnected: false,
  tray: false,
  nonStandardAudioFilesConversion: false,
  osUpdates: false,
  lowBattery: false,
  incomingCalls: false,
  incomingMessages: false,
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

      .addCase(toggleCollectionData.fulfilled, (state, action) => {
        state.collectingData = action.payload
      })

      .addCase(togglePrivacyPolicyAccepted.fulfilled, (state, action) => {
        state.privacyPolicyAccepted = action.payload
      })
      .addCase(deleteCollectingData.fulfilled, (state, _) => {
        state.collectingData = undefined
      })
      .addCase(setDiagnosticTimestamp.fulfilled, (state, action) => {
        state.diagnosticSentTimestamp = action.payload
      })

      .addCase(setOsBackupLocation.fulfilled, (state, action) => {
        state.osBackupLocation = action.payload
      })

      .addCase(setConversionFormat.fulfilled, (state, action) => {
        state.conversionFormat = action.payload
      })

      .addCase(setConvert.fulfilled, (state, action) => {
        state.convert = action.payload
      })

      .addCase(
        setNonStandardAudioFilesConversion.fulfilled,
        (state, action) => {
          state.nonStandardAudioFilesConversion = action.payload
        }
      )

      .addCase(setOsUpdates.fulfilled, (state, action) => {
        state.osUpdates = action.payload
      })

      .addCase(setLowBattery.fulfilled, (state, action) => {
        state.lowBattery = action.payload
      })

      .addCase(setIncomingMessages.fulfilled, (state, action) => {
        state.incomingMessages = action.payload
      })

      .addCase(setIncomingCalls.fulfilled, (state, action) => {
        state.incomingCalls = action.payload
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
      .addCase(skipAvailableUpdate, (state) => {
        state.updateAvailableSkipped = true
      })
  }
)
