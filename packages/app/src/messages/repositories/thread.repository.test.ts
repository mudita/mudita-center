/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadRepository } from "App/messages/repositories/thread.repository"
import { ThreadModel } from "App/messages/models"
import { Thread } from "App/messages"

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
}

const threadModel = {
  create: jest.fn(),
} as unknown as ThreadModel

const subject = new ThreadRepository(threadModel)

describe("`ThreadRepository`", () => {
  test("fire `create` call `contactModel.create` with thread", () => {
    subject.create(thread)
    expect(threadModel.create).toHaveBeenCalledWith(thread, false)
  })
})
