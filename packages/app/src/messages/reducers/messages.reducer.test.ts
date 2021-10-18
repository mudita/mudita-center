/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { messagesReducer, initialState } from "App/messages/reducers/messages.reducer"
import { MessagesEvent } from "App/messages/constants"
import { LoadThreadsError } from "App/messages/errors"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import { ResultState } from "App/messages/reducers/messages.interface"

test("empty event returns initial state", () => {
  expect(messagesReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Load Threads data functionality", () => {
  test("Event: LoadThreads/pending change `threadsState` to Loading", () => {
    expect(
      messagesReducer(undefined, {
        type: pendingAction(MessagesEvent.LoadThreads),
      })
    ).toEqual({
      ...initialState,
      threadsState: ResultState.Loading,
    })
  })

  test("Event: LoadThreads/fulfilled change `threadsState` to Loaded", () => {
    expect(
      messagesReducer(undefined, {
        type: fulfilledAction(MessagesEvent.LoadThreads),
      })
    ).toEqual({
      ...initialState,
      threadsState: ResultState.Loaded,
    })
  })

  test("Event: LoadThreads/rejected change `threadsState` to Error", () => {
    const errorMock = new LoadThreadsError("I'm error")

    expect(
      messagesReducer(undefined, {
        type: rejectedAction(MessagesEvent.LoadThreads),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      threadsState: ResultState.Error,
      error: errorMock,
    })
  })
})
