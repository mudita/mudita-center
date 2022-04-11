/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Message as PureMessage,
  MessageType as PureMessageType,
} from "@mudita/pure"
import {
  AcceptablePureMessageType,
  MessagePresenter,
} from "App/messages/presenters/message.presenter"
import { NewMessage } from "App/messages/reducers/messages.interface"

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

describe("`MessagePresenter`", () => {
  test("`mapToPureMessageMessagesBody` record properly", () => {
    const result = MessagePresenter.mapToPureMessageMessagesBody(newMessage)
    expect(result).toEqual({
      category: "message",
      messageBody:
        "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
      number: "+48500600700",
    })
  })

  test("`mapToMessages` record properly", () => {
    const result = MessagePresenter.mapToMessage(pureMessage)
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
