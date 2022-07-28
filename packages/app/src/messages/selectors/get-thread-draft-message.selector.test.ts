/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { getThreadDraftMessageSelector } from "App/messages/selectors/get-thread-draft-message.selector"
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

const firstDraftMessage: Message = {
  id: "1",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content: "Draft message #1",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.DRAFT,
}

const secondDraftMessage: Message = {
  id: "2",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content: "Draft message #2",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.DRAFT,
}

const outboxMessage: Message = {
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
    [firstDraftMessage.id]: firstDraftMessage,
    [outboxMessage.id]: outboxMessage,
  },
  messageIdsInThreadMap: {
    [thread.id]: [
      firstDraftMessage.id,
      secondDraftMessage.id,
      outboxMessage.id,
    ],
  },
  searchValue: "",
  visibilityFilter: VisibilityFilter.All,
  threadsState: ResultState.Empty,
  messagesStateMap: {},
  error: null,
  loaded: false,
  loading: false,
  currentlyDeletingMessageId: null,
  selectedItems: { rows: [] },
}

describe("When thread hasn't any message", () => {
  test("returns `undefined`", () => {
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
    expect(getThreadDraftMessageSelector(thread.id)(state)).toBeUndefined()
  })
})

describe("When thread have only `OUTBOX` messages", () => {
  test("returns `undefined`", () => {
    const state = {
      messages: {
        ...messagesState,
        messageMap: {
          [outboxMessage.id]: outboxMessage,
        },
        messageIdsInThreadMap: {
          ...messagesState.messageIdsInThreadMap,
          [thread.id]: [outboxMessage.id],
        },
      },
    } as ReduxRootState
    expect(getThreadDraftMessageSelector(thread.id)(state)).toBeUndefined()
  })
})

describe("When thread have `DRAFT` messages", () => {
  test("returns draft message if one exists", () => {
    const state = {
      messages: {
        ...messagesState,
        messageMap: {
          [firstDraftMessage.id]: firstDraftMessage,
          [outboxMessage.id]: outboxMessage,
        },
        messageIdsInThreadMap: {
          ...messagesState.messageIdsInThreadMap,
          [thread.id]: [outboxMessage.id, firstDraftMessage.id],
        },
      },
    } as ReduxRootState
    expect(getThreadDraftMessageSelector(thread.id)(state)).toEqual(
      firstDraftMessage
    )
  })

  test("returns last draft message if many exists", () => {
    const state = {
      messages: {
        ...messagesState,
        messageMap: {
          [firstDraftMessage.id]: firstDraftMessage,
          [secondDraftMessage.id]: secondDraftMessage,
          [outboxMessage.id]: outboxMessage,
        },
        messageIdsInThreadMap: {
          ...messagesState.messageIdsInThreadMap,
          [thread.id]: [
            outboxMessage.id,
            firstDraftMessage.id,
            secondDraftMessage.id,
          ],
        },
      },
    } as ReduxRootState
    expect(getThreadDraftMessageSelector(thread.id)(state)).toEqual(
      secondDraftMessage
    )
  })
})
