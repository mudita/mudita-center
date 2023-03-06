/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { DataSyncError, DataSyncEvent } from "App/data-sync/constants"
import {
  dataSyncReducer,
  initialState,
  SynchronizationState,
} from "App/data-sync/reducers"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import { State } from "App/core/constants"

describe("data-sync functionality", () => {
  test("Event: SetDataSyncInitState set `state` to initial", () => {
    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetDataSyncInitState,
      })
    ).toEqual({
      ...initialState,
    })
  })

  test("Event: UpdateAllIndexes/pending change `state` to Loading", () => {
    expect(
      dataSyncReducer(undefined, {
        type: pendingAction(DataSyncEvent.UpdateAllIndexes),
      })
    ).toEqual({
      ...initialState,
      state: SynchronizationState.Loading,
    })
  })

  test("Event: UpdateAllIndexes/fulfilled change `state` to Loaded and initialized to true", () => {
    expect(
      dataSyncReducer(undefined, {
        type: fulfilledAction(DataSyncEvent.UpdateAllIndexes),
      })
    ).toEqual({
      ...initialState,
      initialized: true,
      state: SynchronizationState.Loaded,
    })
  })

  test("Event: UpdateAllIndexes/rejected change `state` to Error", () => {
    const errorMock = new AppError(DataSyncError.UpdateAllIndexes, "I'm error")

    expect(
      dataSyncReducer(undefined, {
        type: rejectedAction(DataSyncEvent.UpdateAllIndexes),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: SynchronizationState.Error,
      error: errorMock,
    })
  })

  test("Event: SetDataSyncInitialized change `initialized` to true and `error` to null", () => {
    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetDataSyncInitialized,
      })
    ).toEqual({
      ...initialState,
      state: State.Loaded,
      initialized: true,
      error: null,
    })
  })

  test("Event: SetLoadedState changed state to `loaded`", () => {
    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetLoadedState,
      })
    ).toEqual({
      ...initialState,
      state: SynchronizationState.Loaded,
    })
  })

  test("Event: SetCacheState change `state` to Cache and initialized to true", () => {
    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetCacheState,
      })
    ).toEqual({
      ...initialState,
      initialized: true,
      state: SynchronizationState.Cache,
    })
  })

  test("Event: SetLoadingState change `state` changing state to `loading`", () => {
    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetLoadingState,
      })
    ).toEqual({
      ...initialState,
      initialized: false,
      state: SynchronizationState.Loading,
    })
  })

  test("Event: SetErrorState, change `state` changing state to `error` and set a payload", () => {
    const testError = new Error("I'm error")

    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetErrorState,
        payload: testError,
      })
    ).toEqual({
      ...initialState,
      state: SynchronizationState.Error,
      error: testError,
    })
  })
})
