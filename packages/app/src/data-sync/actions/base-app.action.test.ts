/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DataSyncEvent } from "App/data-sync"
import { setDataSyncInitialized } from "App/data-sync/actions/base-app.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
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
