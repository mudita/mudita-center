/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DataSyncState,
  SynchronizationState,
  UpdateAllIndexesRejectAction,
  SetErrorStateError,
  SynchronizationProcessState,
} from "App/data-sync/reducers/data-sync.interface"
import { createReducer } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants/event.enum"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import { setInitializationFailed } from "../actions"

export const initialState: DataSyncState = {
  initialized: false,
  initializationFailed: false,
  state: SynchronizationState.Empty,
  synchronizationProcess: SynchronizationProcessState.Done,
  error: null,
}
export const dataSyncReducer = createReducer<DataSyncState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        DataSyncEvent.SetDataSyncInitState,
        ({ initializationFailed }) => {
          return {
            ...initialState,
            initializationFailed,
          }
        }
      )
      .addCase(DataSyncEvent.SetDataSyncInitialized, (state) => {
        return {
          ...state,
          state: SynchronizationState.Loaded,
          initialized: true,
          error: null,
          initializationFailed: false,
        }
      })
      .addCase(pendingAction(DataSyncEvent.UpdateAllIndexes), (state) => {
        return {
          ...state,
          state: SynchronizationState.Loading,
          synchronizationProcess: SynchronizationProcessState.InProgress,
        }
      })
      .addCase(fulfilledAction(DataSyncEvent.UpdateAllIndexes), (state) => {
        return {
          ...state,
          state: SynchronizationState.Loaded,
          synchronizationProcess: SynchronizationProcessState.Done,
          initialized: true,
          error: null,
          initializationFailed: false,
        }
      })
      .addCase(
        rejectedAction(DataSyncEvent.UpdateAllIndexes),
        (state, action: UpdateAllIndexesRejectAction) => {
          return {
            ...state,
            state: SynchronizationState.Error,
            synchronizationProcess: SynchronizationProcessState.Done,
            error: action.payload,
          }
        }
      )
      .addCase(DataSyncEvent.SetLoadingState, (state) => {
        return {
          ...state,
          state: SynchronizationState.Loading,
          synchronizationProcess: SynchronizationProcessState.InProgress,
        }
      })
      .addCase(DataSyncEvent.SetCacheState, (state) => {
        return {
          ...state,
          state: SynchronizationState.Cache,
          initialized: true,
          initializationFailed: false,
        }
      })
      .addCase(DataSyncEvent.SetLoadedState, (state) => {
        return {
          ...state,
          state: SynchronizationState.Loaded,
          synchronizationProcess: SynchronizationProcessState.Done,
        }
      })
      .addCase(
        DataSyncEvent.SetErrorState,
        (state, action: SetErrorStateError) => {
          return {
            ...state,
            state: SynchronizationState.Error,
            synchronizationProcess: SynchronizationProcessState.Done,
            error: action.payload,
          }
        }
      )
      .addCase(setInitializationFailed, (state, action) => {
        state.initializationFailed = action.payload
      })
  }
)
