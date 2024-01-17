/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DataSyncState,
  SynchronizationStatus,
} from "Core/data-sync/reducers/data-sync.interface"
import { createReducer } from "@reduxjs/toolkit"
import {
  setDataSyncInitState,
  setDataSyncSetStatus,
  updateAllIndexes,
} from "Core/data-sync/actions"
import { AppError } from "Core/core/errors"

export const initialState: DataSyncState = {
  status: SynchronizationStatus.Empty,
  error: null,
}

export const dataSyncReducer = createReducer<DataSyncState>(
  initialState,
  (builder) => {
    builder
      .addCase(setDataSyncInitState, () => {
        return {
          ...initialState,
        }
      })
      .addCase(setDataSyncSetStatus, (state, action) => {
        return {
          ...state,
          status: action.payload,
          error: null,
        }
      })
      .addCase(updateAllIndexes.pending, (state, action) => {
        return {
          ...state,
          status: SynchronizationStatus.Loading,
          error: null,
        }
      })
      .addCase(updateAllIndexes.rejected, (state, action) => {
        return {
          ...state,
          status: SynchronizationStatus.Error,
          error: action.payload as AppError,
        }
      })
      .addCase(updateAllIndexes.fulfilled, (state, action) => {
        return {
          ...state,
          status: SynchronizationStatus.Loaded,
          error: null,
        }
      })
  }
)
