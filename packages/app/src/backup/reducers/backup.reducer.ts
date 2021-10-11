/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  BackupDataState,
  BackupState,
  LoadBackupDataRejectAction,
  SetBackupDataAction,
} from "App/backup/reducers/backup.interface"
import { BackupEvent } from "App/backup/constants"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"

export const initialState: BackupState = {
  backups: [],
  state: BackupDataState.Empty,
  error: null,
}

export const backupReducer = createReducer<BackupState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(BackupEvent.Load), (state) => {
        return {
          ...state,
          state: BackupDataState.Loading,
        }
      })
      .addCase(fulfilledAction(BackupEvent.Load), (state) => {
        return {
          ...state,
          state: BackupDataState.Loaded,
          error: null,
        }
      })
      .addCase(
        rejectedAction(BackupEvent.Load),
        (state, action: LoadBackupDataRejectAction) => {
          return {
            ...state,
            state: BackupDataState.Error,
            error: action.payload,
          }
        }
      )

      .addCase(
        BackupEvent.SetBackupData,
        (state, action: SetBackupDataAction) => {
          return {
            ...state,
            backups: [...action.payload],
            error: null,
          }
        }
      )
  }
)
