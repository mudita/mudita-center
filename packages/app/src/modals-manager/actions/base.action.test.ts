/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { hideModals, toggleCollectingDataModalShow } from "App/modals-manager/actions/base.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: hideModals", () => {
  test("fire action with `HideModals` type", () => {
    mockStore.dispatch(hideModals())
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.HideModals,
        payload: undefined,
      },
    ])
  })
})

describe("Action: toggleCollectingDataModalShow", () => {
  test("fire action with `true` and `ToggleCollectingDataModalShow` type", () => {
    mockStore.dispatch(toggleCollectingDataModalShow(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.ToggleCollectingDataModalShow,
        payload: true,
      },
    ])
  })

  test("fire action with `false` and `ToggleCollectingDataModalShow` type", () => {
    mockStore.dispatch(toggleCollectingDataModalShow(false))
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.ToggleCollectingDataModalShow,
        payload: false,
      },
    ])
  })
})
