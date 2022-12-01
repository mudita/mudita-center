/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message as PureMessage } from "App/device/types/mudita-os"
import { MessageType as PureMessageType } from "App/device/constants"
import {
  AcceptablePureMessageType,
  MessagePresenter,
} from "App/messages/presenters/message.presenter"
import { MessageType } from "App/messages/constants"
import { NewMessage, Message } from "App/messages/dto"

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

const message: Message = {
  id: "1",
  threadId: "2",
  messageType: MessageType.INBOX,
  date: new Date(1547465101 * 1000),
  content:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  phoneNumber: "+48500600700",
}

describe("Method: mapToCreatePureMessageBody", () => {
  test("returns serialized pure Message", () => {
    const result = MessagePresenter.mapToCreatePureMessageBody(newMessage)
    expect(result).toEqual({
      category: "message",
      messageBody:
        "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
      number: "+48500600700",
    })
  })

  test("returns serialized pure Message with `messageType` field if provided", () => {
    const result = MessagePresenter.mapToCreatePureMessageBody({
      ...newMessage,
      messageType: MessageType.DRAFT,
    })
    expect(result).toEqual({
      category: "message",
      messageBody:
        "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
      number: "+48500600700",
      messageType: 1,
    })
  })
})

describe("Method: mapToUpdatePureMessagesBody", () => {
  test("returns serialized pure Message", () => {
    const result = MessagePresenter.mapToUpdatePureMessagesBody(message)
    expect(result).toEqual({
      category: "message",
      messageBody: message.content,
      messageID: Number(message.id),
      messageType: 4,
    })
  })
})

describe("Method: mapToMessages", () => {
  test("returns serialized Message DTO", () => {
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
  test("returns queue message type if pure message is queued", () => {
    const result = MessagePresenter.mapToMessage({
      ...pureMessage,
      messageType: PureMessageType.QUEUED,
    })
    expect(result).toEqual({
      content:
        "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
      date: new Date(1547465101 * 1000),
      id: "6",
      messageType: "QUEUED",
      phoneNumber: "+48500600700",
      threadId: "1",
    })
  })
})
