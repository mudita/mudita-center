/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { GlobalModalsManagerEvent } from "App/global-modals-manager/constants"
import { toggleAllModalsShowBlocked } from "App/global-modals-manager/actions/base.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: toggleAllModalsShowBlocked", () => {
  test("fire action with `true` and `ToggleAllModalsShowBlocked` type", () => {
    mockStore.dispatch(toggleAllModalsShowBlocked(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: GlobalModalsManagerEvent.ToggleAllModalsShowBlocked,
        payload: true,
      },
    ])
  })

  test("fire action with `false` and `ToggleAllModalsShowBlocked` type", () => {
    mockStore.dispatch(toggleAllModalsShowBlocked(false))
    expect(mockStore.getActions()).toEqual([
      {
        type: GlobalModalsManagerEvent.ToggleAllModalsShowBlocked,
        payload: false,
      },
    ])
  })
})

describe("Action: toggleCollectingDataModalShow", () => {
  test("fire action with `true` and `ToggleCollectingDataModalShow` type", () => {
    mockStore.dispatch(toggleAllModalsShowBlocked(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: GlobalModalsManagerEvent.ToggleAllModalsShowBlocked,
        payload: true,
      },
    ])
  })

  test("fire action with `false` and `ToggleCollectingDataModalShow` type", () => {
    mockStore.dispatch(toggleAllModalsShowBlocked(false))
    expect(mockStore.getActions()).toEqual([
      {
        type: GlobalModalsManagerEvent.ToggleAllModalsShowBlocked,
        payload: false,
      },
    ])
  })
})
