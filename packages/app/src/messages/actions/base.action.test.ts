/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import {
  changeSearchValue,
  changeVisibilityFilter,
  deleteThreads,
  clearAllThreads,
  markThreadsAsRead,
  setMessages,
  setThreads,
  toggleThreadsReadStatus,
} from "App/messages/actions/base.action"
import { MessagesEvent } from "App/messages/constants"
import { VisibilityFilter } from "App/messages/reducers"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: toggleThreadsReadStatus", () => {
  test("fire action with empty array and `ToggleThreadReadStatus` type", () => {
    mockStore.dispatch(toggleThreadsReadStatus([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.ToggleThreadReadStatus,
        payload: [],
      },
    ])
  })
})

describe("Action: markThreadsAsRead", () => {
  test("fire action with empty array and `MarkThreadAsRead` type", () => {
    mockStore.dispatch(markThreadsAsRead([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.MarkThreadAsRead,
        payload: [],
      },
    ])
  })
})

describe("Action: deleteThreads", () => {
  test("fire action with empty array and `DeleteThreads` type", () => {
    mockStore.dispatch(deleteThreads([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.DeleteThreads,
        payload: [],
      },
    ])
  })
})

describe("Action: setThreads", () => {
  test("fire action with empty array and `SetThreads` type", () => {
    mockStore.dispatch(setThreads([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.SetThreads,
        payload: [],
      },
    ])
  })
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

describe("Action: changeSearchValue", () => {
  test("fire action with empty array and `ChangeSearchValue` type", () => {
    mockStore.dispatch(changeSearchValue("search value"))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.ChangeSearchValue,
        payload: "search value",
      },
    ])
  })
})

describe("Action: setMessages", () => {
  test("fire action with empty array and `SetMessages` type", () => {
    mockStore.dispatch(setMessages([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.SetMessages,
        payload: [],
      },
    ])
  })
})

describe("Action: clearAllThreads", () => {
  test("fire action without payload and `DevClearAllThreads` type", () => {
    mockStore.dispatch(clearAllThreads())
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.ClearAllThreads,
        payload: undefined,
      },
    ])
  })
})
