/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { Caller } from "Renderer/models/calls/calls.interface"
import { Thread } from "App/messages/reducers/messages.interface"

const caller: Caller = {
  id: "1",
  phoneNumber: "+33999999999",
}

const mockThread = { id: caller.phoneNumber, contactId: caller.id } as Thread
const mockThreads = [mockThread]

const searchValue = `?phoneNumber=${caller.phoneNumber}`

test("thread is found by search params", () => {
  const thread = findThreadBySearchParams(
    new URLSearchParams(searchValue),
    mockThreads
  )
  expect(thread?.contactId).toEqual(caller.id)
})

test("thread is found even if phoneNumber has another format", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(searchValue), [
    { ...mockThread, id: "+33 999 999 999" },
  ])
  expect(thread?.contactId).toEqual(caller.id)
})

test("thread isn't found when phoneNumber is started with double zero", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(searchValue), [
    { ...mockThread, id: "0033 999 999 999" },
  ])
  expect(thread).toBeUndefined()
})

test("thread isn't found without search value", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(``), mockThreads)
  expect(thread).toBeUndefined()
})
