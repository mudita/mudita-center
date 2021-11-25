/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { setModalsState } from "App/modals-manager/actions/base.action"
import { initialState } from "App/modals-manager/reducers"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setModalsState", () => {
  test("fire action with `initialState` and `SetModalsState` type", () => {
    mockStore.dispatch(setModalsState(initialState))
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.SetModalsState,
        payload: initialState,
      },
    ])
  })
})
