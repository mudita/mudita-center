/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { State } from "App/core/constants"
import { BackupState } from "App/backup/reducers/backup.interface"
import {
  loadBackupData,
  setBackupData,
  readBackupDeviceDataState,
  startBackupDevice,
  startRestoreDevice,
  readRestoreDeviceDataState,
} from "App/backup/actions"

export const initialState: BackupState = {
  data: {
    backups: [],
  },
  loadingState: State.Initial,
  backingUpState: State.Initial,
  restoringState: State.Initial,
  error: null,
}

export const backupReducer = createReducer<BackupState>(
  initialState,
  (builder) => {
    builder
      .addCase(loadBackupData.pending, (state) => {
        state.loadingState = State.Loading
      })
      .addCase(loadBackupData.fulfilled, (state) => {
        state.loadingState = State.Loaded
        state.error = null
      })
      .addCase(loadBackupData.rejected, (state, action) => {
        state.loadingState = State.Failed
        state.error = action.payload as AppError
      })
      .addCase(setBackupData, (state, action) => {
        state.data.backups = action.payload
        state.error = null
      })

      .addCase(startBackupDevice.pending, (state) => {
        state.backingUpState = State.Loading
      })
      .addCase(startBackupDevice.fulfilled, (state) => {
        state.backingUpState = State.Loaded
      })
      .addCase(startBackupDevice.rejected, (state, action) => {
        state.backingUpState = State.Failed
        state.error = action.payload as AppError
      })
      .addCase(readBackupDeviceDataState, (state) => {
        state.backingUpState = State.Initial
        state.error = null
      })

      .addCase(startRestoreDevice.pending, (state) => {
        state.restoringState = State.Loading
      })
      .addCase(startRestoreDevice.fulfilled, (state) => {
        state.restoringState = State.Loaded
      })
      .addCase(startRestoreDevice.rejected, (state, action) => {
        state.restoringState = State.Failed
        state.error = action.payload as AppError
      })
      .addCase(readRestoreDeviceDataState, (state) => {
        state.restoringState = State.Initial
        state.error = null
      })
  }
)
