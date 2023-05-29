/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import {
  changeVisibilityFilter,
  clearAllThreads,
} from "App/messages/actions/base.action"
import { MessagesEvent, VisibilityFilter } from "App/messages/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: changeVisibilityFilter", () => {
  test("fire action with empty array and `ChangeVisibilityFilter` type", () => {
    mockStore.dispatch(changeVisibilityFilter(VisibilityFilter.All))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.ChangeVisibilityFilter,
        payload: VisibilityFilter.All,
      },
    ])
  })
})

describe("Action: clearAllThreads", () => {
  test("fire action without payload and `ClearAllThreads` type", () => {
    mockStore.dispatch(clearAllThreads())
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.ClearAllThreads,
        payload: undefined,
      },
    ])
  })
})
