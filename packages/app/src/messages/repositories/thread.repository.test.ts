/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadRepository } from "App/messages/repositories/thread.repository"
import { ThreadModel } from "App/messages/models"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
}

const threadModel = {
  create: jest.fn().mockImplementationOnce((value: Thread) => value),
  update: jest.fn().mockImplementationOnce((value: Thread) => value),
  delete: jest.fn().mockImplementationOnce((value: string) => value),
} as unknown as ThreadModel

const subject = new ThreadRepository(threadModel)

describe("`ThreadRepository`", () => {
  test("fire `create` call `contactModel.create` with thread", () => {
    expect(subject.create(thread)).toEqual(thread)
    expect(threadModel.create).toHaveBeenCalledWith(thread, false)
  })

  test("fire `update` call `contactModel.update` with thread", () => {
    expect(subject.update(thread)).toEqual(thread)
    expect(threadModel.update).toHaveBeenCalledWith(thread, false)
  })

  test("fire `delete` call `contactModel.delete` with thread", () => {
    expect(subject.delete(thread.id)).toBeUndefined
    expect(threadModel.delete).toHaveBeenCalledWith(thread.id, false)
  })
})
