/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store/helpers"
import { dataSyncReducer, initialState } from "App/data-sync/reducers/data-sync.reducer"
import { DataSyncEvent } from "App/data-sync"
import { UpdateAllIndexesError } from "App/data-sync/errors"
import { SynchronizationState } from "App/data-sync/reducers/data-sync.interface"

describe("Load Contacts data functionality", () => {
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
})
