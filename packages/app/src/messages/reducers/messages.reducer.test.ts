/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  messagesReducer,
  initialState,
} from "App/messages/reducers/messages.reducer"
import { MessagesEvent } from "App/messages/constants"
import { LoadMessagesByIdError, LoadThreadsError } from "App/messages/errors"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import { ResultState, Thread } from "App/messages/reducers/messages.interface"
import { PayloadAction } from "@reduxjs/toolkit"

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

describe("Load Messages By Id data functionality", () => {
  const threadId = "1"

  test("Event: LoadMessagesById/pending change one of properties in `messagesStateMap` to Loading", () => {
    expect(
      messagesReducer(undefined, {
        type: pendingAction(MessagesEvent.LoadMessagesById),
        meta: { arg: { threadId } },
      })
    ).toEqual({
      ...initialState,
      messagesStateMap: {
        [threadId]: ResultState.Loading,
      },
    })
  })

  test("Event: LoadMessagesById/fulfilled change one of properties in `messagesStateMap` to Loaded", () => {
    expect(
      messagesReducer(undefined, {
        type: fulfilledAction(MessagesEvent.LoadMessagesById),
        meta: { arg: { threadId } },
      })
    ).toEqual({
      ...initialState,
      messagesStateMap: {
        [threadId]: ResultState.Loaded,
      },
    })
  })

  test("Event: LoadMessagesById/rejected change one of properties in `messagesStateMap` to Error", () => {
    const errorMock = new LoadMessagesByIdError("I'm error")

    expect(
      messagesReducer(undefined, {
        type: rejectedAction(MessagesEvent.LoadMessagesById),
        meta: { arg: { threadId } },
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      messagesStateMap: {
        [threadId]: ResultState.Error,
      },
      error: errorMock,
    })
  })
})

describe("Set Threads data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    contactId: "1",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  test("Event: SetThreads set threadMap field", () => {
    const setThreadsAction: PayloadAction<Thread[]> = {
      type: MessagesEvent.SetThreads,
      payload: [thread],
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: thread,
      },
    })
  })

  test("Event: SetThreads replace existing threadMap field when thread received with the same `id`", () => {
    const setThreadsAction: PayloadAction<Thread[]> = {
      type: MessagesEvent.SetThreads,
      payload: [{ ...thread, messageSnippet: "new message" }],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: setThreadsAction.payload[0],
      },
    })
  })

  test("Event: SetThreads no replace existing threadMap field when thread received with another `id`", () => {
    const setThreadsAction: PayloadAction<Thread[]> = {
      type: MessagesEvent.SetThreads,
      payload: [{ ...thread, id: "2" }],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: thread,
        [setThreadsAction.payload[0].id]: setThreadsAction.payload[0],
      },
    })
  })
})
