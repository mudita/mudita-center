/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getActiveMessagesByThreadIdSelector } from "Core/messages/selectors/get-active-messages-by-thread-id.selector"
import { MessagesState } from "Core/messages/reducers"
import { Message, Thread } from "Core/messages/dto"
import {
  MessageType,
  ResultState,
  VisibilityFilter,
} from "Core/messages/constants"
import { State } from "Core/core/constants"

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
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
  data: {
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
    messagesStateMap: {},
    searchValue: "",
    visibilityFilter: VisibilityFilter.All,
    threadsState: ResultState.Empty,
    currentlyDeletingMessageId: null,
    searchResult: {},
    searchPreviewResult: {},
  },
  selectedItems: { rows: [] },
  error: null,
  state: State.Initial,
}

describe("When thread hasn't any message", () => {
  test("returns empty list", () => {
    const state = {
      messages: {
        ...messagesState,
        data: {
          messageMap: {},
          messageIdsInThreadMap: {
            ...messagesState.data.messageIdsInThreadMap,
            [thread.id]: [],
          },
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
        data: {
          messageMap: {
            [draftMessage.id]: draftMessage,
            [firstMessage.id]: firstMessage,
            [secondMessage.id]: secondMessage,
          },
          messageIdsInThreadMap: {
            ...messagesState.data.messageIdsInThreadMap,
            [thread.id]: [draftMessage.id, firstMessage.id, secondMessage.id],
          },
        },
      },
    } as ReduxRootState
    expect(getActiveMessagesByThreadIdSelector(thread.id)(state)).toEqual([
      firstMessage,
      secondMessage,
    ])
  })
})
