/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { Caller } from "Renderer/models/calls/calls.interface"
import { Thread } from "App/messages/store/messages.interface"

const caller: Caller = {
  id: "1",
  phoneNumber: "+33999999999",
}

const threads = [{ caller } as Thread]

const searchValue = `?phoneNumber=${caller.phoneNumber}`

test("thread is found by search params", () => {
  const thread = findThreadBySearchParams(
    new URLSearchParams(searchValue),
    threads
  )
  expect(thread?.caller.id).toEqual(caller.id)
})

test("thread is found even if phoneNumber has another format", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(searchValue), [
    { caller: { ...caller, phoneNumber: "+33 999 999 999" } } as Thread,
  ])
  expect(thread?.caller.id).toEqual(caller.id)
})

test("thread isn't found when phoneNumber is started with double zero", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(searchValue), [
    { caller: { ...caller, phoneNumber: "0033 999 999 999" } } as Thread,
  ])
  expect(thread).toBeUndefined()
})

test("thread isn't found without search value", () => {
  const thread = findThreadBySearchParams(new URLSearchParams(``), threads)
  expect(thread).toBeUndefined()
})
