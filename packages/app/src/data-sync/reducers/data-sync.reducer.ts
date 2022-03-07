/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DataSyncState,
  SynchronizationState,
  UpdateAllIndexesRejectAction,
} from "App/data-sync/reducers/data-sync.interface"
import { createReducer } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants/event.enum"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"

export const initialState: DataSyncState = {
  initialized: false,
  state: SynchronizationState.Empty,
  error: null,
}
export const dataSyncReducer = createReducer<DataSyncState>(
  initialState,
  (builder) => {
    builder
      .addCase(DataSyncEvent.SetDataSyncInitialized, (state) => {
        return {
          ...state,
          initialized: true,
          error: null,
        }
      })
      .addCase(pendingAction(DataSyncEvent.InitializeDataSync), (state) => {
        return {
          ...state,
          state: SynchronizationState.Loading,
        }
      })
      .addCase(pendingAction(DataSyncEvent.UpdateAllIndexes), (state) => {
        return {
          ...state,
          state: SynchronizationState.Loading,
        }
      })
      .addCase(fulfilledAction(DataSyncEvent.UpdateAllIndexes), (state) => {
        return {
          ...state,
          state: SynchronizationState.Loaded,
          initialized: true,
          error: null,
        }
      })
      .addCase(
        rejectedAction(DataSyncEvent.UpdateAllIndexes),
        (state, action: UpdateAllIndexesRejectAction) => {
          return {
            ...state,
            state: SynchronizationState.Error,
            error: action.payload,
          }
        }
      )
      .addCase(DataSyncEvent.SetCacheState, (state) => {
        return {
          ...state,
          state: SynchronizationState.Cache,
          initialized: true,
        }
      })
      .addCase(fulfilledAction(DataSyncEvent.ReadAllIndexes), (state) => {
        return {
          ...state,
          state: SynchronizationState.Loaded,
          initialized: true,
        }
      })
  }
)
