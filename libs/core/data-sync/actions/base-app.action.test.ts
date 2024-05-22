/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DataSyncEvent } from "Core/data-sync/constants"
import { setDataSyncInitState } from "Core/data-sync/actions/base-app.action"

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
