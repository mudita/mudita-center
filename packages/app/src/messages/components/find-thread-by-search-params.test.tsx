/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { Caller } from "App/__deprecated__/renderer/models/calls/calls.interface"
import { MessageType } from "App/messages/constants"
import { Thread } from "App/messages/dto"

const caller: Caller = {
  id: "1",
  phoneNumber: "+33999999999",
}

const mockThread: Thread = {
  id: "1",
  lastUpdatedAt: new Date(1617089558 * 1000),
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: true,
  phoneNumber: caller.phoneNumber,
  messageType: MessageType.INBOX,
}
const mockThreads: Thread[] = [mockThread]

const searchValue = `?phoneNumber=${caller.phoneNumber}`

test("thread is found by search params", () => {
  const thread = findThreadBySearchParams(
    new URLSearchParams(searchValue),
    mockThreads
  )
  expect(thread?.phoneNumber).toEqual(caller.phoneNumber)
})

test("thread is found even if phoneNumber has another format", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(searchValue), [
    { ...mockThread, phoneNumber: "+33 999 999 999" },
  ])
  expect(thread?.phoneNumber).toEqual("+33 999 999 999")
})

test("thread isn't found when phoneNumber is started with double zero", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(searchValue), [
    { ...mockThread, phoneNumber: "0033 999 999 999" },
  ])
  expect(thread).toBeUndefined()
})

test("thread isn't found without search value", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(``), mockThreads)
  expect(thread).toBeUndefined()
})
