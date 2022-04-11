/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message as PureMessage,
  Thread as PureThread,
  MessageType as PureMessageType,
} from "@mudita/pure"
import {
  AcceptablePureMessageType,
  MessagesPresenter,
} from "App/messages/presenters/messages.presenter"
import { NewMessage, Thread } from "App/messages/reducers/messages.interface"

const pureThread: PureThread = {
  contactID: 1,
  isUnread: true,
  lastUpdatedAt: 1617089558,
  messageCount: 1,
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  messageType: 1,
  number: "+48500600700",
  threadID: 1,
}

const thread: Thread = {
  id: "1",
  phoneNumber: "+48500600700",
  lastUpdatedAt: new Date(1617089558 * 1000),
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: true,
}

const pureMessage: PureMessage & {
  messageType: AcceptablePureMessageType
} = {
  contactID: 2,
  messageBody:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  messageID: 6,
  messageType: PureMessageType.OUTBOX,
  createdAt: 1547465101,
  threadID: 1,
  number: "+48500600700",
}

const newMessage: NewMessage = {
  content:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  phoneNumber: "+48500600700",
}

jest.mock("Backend/device-service")

describe("`MessagesPresenter`", () => {
  test("`mapToPureMessageMessagesBody` record properly", () => {
    const result = MessagesPresenter.mapToPureMessageMessagesBody(newMessage)
    expect(result).toEqual({
      category: "message",
      messageBody:
        "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
      number: "+48500600700",
    })
  })

  test("`mapToThreads` record properly", () => {
    const result = MessagesPresenter.mapToThreads(pureThread)
    expect(result).toEqual(thread)
  })

  test("`mapToMessages` record properly", () => {
    const result = MessagesPresenter.mapToMessages(pureMessage)
    expect(result).toEqual({
      content:
        "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
      date: new Date(1547465101 * 1000),
      id: "6",
      messageType: "OUTBOX",
      phoneNumber: "+48500600700",
      threadId: "1",
    })
  })
})
