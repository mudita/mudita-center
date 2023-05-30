/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { MessageType } from "App/messages/constants"
import { Thread } from "App/messages/dto"

const phoneNumberId = "1"

const mockThread: Thread = {
  id: "1",
  lastUpdatedAt: new Date(1617089558 * 1000),
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: true,
  phoneNumberId,
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}
const mockThreads: Thread[] = [mockThread]

const searchValue = `?phoneNumberId=${phoneNumberId}`

test("thread is found by search params", () => {
  const thread = findThreadBySearchParams(
    new URLSearchParams(searchValue),
    mockThreads
  )
  expect(thread?.phoneNumberId).toEqual(phoneNumberId)
})

test("thread isn't found without search value", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(``), mockThreads)
  expect(thread).toBeUndefined()
})
