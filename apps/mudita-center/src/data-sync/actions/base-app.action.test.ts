/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DataSyncEvent } from "App/data-sync/constants"
import {
  setCacheState,
  setDataSyncInitialized,
  setDataSyncInitState,
} from "App/data-sync/actions/base-app.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: SetDataSyncInitState", () => {
  test("fire action without payload and `SetDataSyncInitState` type", () => {
    mockStore.dispatch(setDataSyncInitState())
    expect(mockStore.getActions()).toEqual([
      {
        type: DataSyncEvent.SetDataSyncInitState,
        payload: undefined,
      },
    ])
  })
})

describe("Action: SetDataSyncInitialized", () => {
  test("fire action without payload and `SetDataSyncInitialized` type", () => {
    mockStore.dispatch(setDataSyncInitialized())
    expect(mockStore.getActions()).toEqual([
      {
        type: DataSyncEvent.SetDataSyncInitialized,
        payload: undefined,
      },
    ])
  })
})

describe("Action: SetCacheState", () => {
  test("fire action without payload and `SetCacheState` type", () => {
    mockStore.dispatch(setCacheState())
    expect(mockStore.getActions()).toEqual([
      {
        type: DataSyncEvent.SetCacheState,
        payload: undefined,
      },
    ])
  })
})
