/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageRepository } from "App/messages/repositories/message.repository"
import { MessageModel } from "App/messages/models"
import { Message, MessageType } from "App/messages/reducers"

const message: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const messageModel = {
  create: jest.fn().mockImplementationOnce((value: Message) => value),
  update: jest.fn().mockImplementationOnce((value: Message) => value),
  delete: jest.fn().mockImplementationOnce((value: string) => value),
  findById: jest.fn().mockImplementationOnce((value: string) => value),
} as unknown as MessageModel

const subject = new MessageRepository(messageModel)

describe("`MessageRepository`", () => {
  test("fire `create` call `messageModel.create` with message", () => {
    expect(subject.create(message)).toEqual(message)
    expect(messageModel.create).toHaveBeenCalledWith(message, false)
  })

  test("fire `update` call `messageModel.update` with message", () => {
    expect(subject.update(message)).toEqual(message)
    expect(messageModel.update).toHaveBeenCalledWith(message, false)
  })

  test("fire `delete` call `messageModel.delete` with message id", () => {
    expect(subject.delete(message.id)).toBeUndefined()
    expect(messageModel.delete).toHaveBeenCalledWith(message.id, false)
  })

  test("fire `get` call `messageModel.findById` with message id", () => {
    subject.get(message.id)
    expect(messageModel.findById).toHaveBeenCalledWith(message.id)
  })
})
