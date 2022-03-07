/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import {
  dataSyncReducer,
  initialState,
  SynchronizationState,
} from "App/data-sync/reducers"
import { DataSyncEvent } from "App/data-sync/constants"
import { UpdateAllIndexesError } from "App/data-sync/errors"

describe("Update all indexes data functionality", () => {
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
    const errorMock = new UpdateAllIndexesError("I'm error")

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

  test("Event: ReadAllIndexes/fulfilled change `state` to Loaded", () => {
    expect(
      dataSyncReducer(undefined, {
        type: fulfilledAction(DataSyncEvent.ReadAllIndexes),
      })
    ).toEqual({
      ...initialState,
      initialized: true,
      state: SynchronizationState.Loaded,
    })
  })
})

describe("`InitializeDataSync` data functionality", () => {
  test("Event: InitializeDataSync/pending change `state` to Loading", () => {
    expect(
      dataSyncReducer(undefined, {
        type: pendingAction(DataSyncEvent.UpdateAllIndexes),
      })
    ).toEqual({
      ...initialState,
      state: SynchronizationState.Loading,
    })
  })
})

describe("`InitializeDataSync` data functionality", () => {
  test("Event: SetDataSyncInitialized change `initialized` to true and `error` to null", () => {
    expect(
      dataSyncReducer(undefined, {
        type: DataSyncEvent.SetDataSyncInitialized,
      })
    ).toEqual({
      ...initialState,
      initialized: true,
      error: null,
    })
  })
})

describe("`InitializeDataSync` data functionality", () => {
  test("Event: SetDataSyncInitialized change `state` to Cache and initialized to true ", () => {
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
})
