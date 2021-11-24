/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { GlobalModalsManagerEvent } from "App/global-modals-manager/constants"
import { setAllModalsShowBlocked } from "App/global-modals-manager/actions/base.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setAllModalsShowBlocked", () => {
  test("fire action with `true` and `SetAllModalsShowBlocked` type", () => {
    mockStore.dispatch(setAllModalsShowBlocked(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: GlobalModalsManagerEvent.SetAllModalsShowBlocked,
        payload: true,
      },
    ])
  })

  test("fire action with `false` and `SetAllModalsShowBlocked` type", () => {
    mockStore.dispatch(setAllModalsShowBlocked(false))
    expect(mockStore.getActions()).toEqual([
      {
        type: GlobalModalsManagerEvent.SetAllModalsShowBlocked,
        payload: false,
      },
    ])
  })
})
