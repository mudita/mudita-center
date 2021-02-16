/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Topic } from "Renderer/models/messages/messages.interface"
import findTopicBySearchParams from "Renderer/modules/messages/find-topic-by-search-params"
import { Caller } from "Renderer/models/calls/calls.interface"

const caller: Caller = {
  id: "1",
  phoneNumber: "+33999999999",
}

const topics = [{ caller } as Topic]

const searchValue = `?phoneNumber=${caller.phoneNumber}`

test("topic is found by search params", () => {
  const topic = findTopicBySearchParams(
    new URLSearchParams(searchValue),
    topics
  )
  expect(topic?.caller.id).toEqual(caller.id)
})

test("topic is found even if phoneNumber has another format", () => {
  const topic = findTopicBySearchParams(new URLSearchParams(searchValue), [
    { caller: { ...caller, phoneNumber: "+33 999 999 999" } } as Topic,
  ])
  expect(topic?.caller.id).toEqual(caller.id)
})

test("topic isn't found when phoneNumber is started with double zero", () => {
  const topic = findTopicBySearchParams(new URLSearchParams(searchValue), [
    { caller: { ...caller, phoneNumber: "0033 999 999 999" } } as Topic,
  ])
  expect(topic).toBeUndefined()
})

test("topic isn't found without search value", () => {
  const topic = findTopicBySearchParams(new URLSearchParams(``), topics)
  expect(topic).toBeUndefined()
})
