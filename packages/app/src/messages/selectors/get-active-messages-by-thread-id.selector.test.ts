/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { getActiveMessagesByThreadIdSelector } from "App/messages/selectors/get-active-messages-by-thread-id.selector"
import { MessagesState } from "App/messages/reducers"
import { Message, Thread } from "App/messages/dto"
import {
  MessageType,
  ResultState,
  VisibilityFilter,
} from "App/messages/constants"

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
}

const draftMessage: Message = {
  id: "1",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content: "Draft message #1",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.DRAFT,
}

const firstMessage: Message = {
  id: "2",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content: "Draft message #2",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const secondMessage: Message = {
  id: "3",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content: "Outbox message",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.OUTBOX,
}

const messagesState: MessagesState = {
  threadMap: {
    [thread.id]: thread,
  },
  messageMap: {
    [draftMessage.id]: draftMessage,
    [firstMessage.id]: firstMessage,
    [secondMessage.id]: secondMessage,
  },
  messageIdsInThreadMap: {
    [thread.id]: [draftMessage.id, firstMessage.id, secondMessage.id],
  },
  searchValue: "",
  visibilityFilter: VisibilityFilter.All,
  threadsState: ResultState.Empty,
  messagesStateMap: {},
  error: null,
  loaded: false,
  loading: false,
  currentlyDeletingMessageId: null,
}

describe("When thread hasn't any message", () => {
  test("returns empty list", () => {
    const state = {
      messages: {
        ...messagesState,
        messageMap: {},
        messageIdsInThreadMap: {
          ...messagesState.messageIdsInThreadMap,
          [thread.id]: [],
        },
      },
    } as ReduxRootState
    expect(getActiveMessagesByThreadIdSelector(thread.id)(state)).toEqual([])
  })
})

describe("When thread have messages", () => {
  test("returns list of messages without `DRAFT`", () => {
    const state = {
      messages: {
        ...messagesState,
        messageMap: {
          [draftMessage.id]: draftMessage,
          [firstMessage.id]: firstMessage,
          [secondMessage.id]: secondMessage,
        },
        messageIdsInThreadMap: {
          ...messagesState.messageIdsInThreadMap,
          [thread.id]: [draftMessage.id, firstMessage.id, secondMessage.id],
        },
      },
    } as ReduxRootState
    expect(getActiveMessagesByThreadIdSelector(thread.id)(state)).toEqual([
      firstMessage,
      secondMessage,
    ])
  })
})
