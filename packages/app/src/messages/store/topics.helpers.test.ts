/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { searchTopics } from "App/messages/store/topics.helpers"
import { createFakeCaller } from "App/messages/helpers/create-fake-caller"
import { Topic } from "App/messages/store/messages.interface"

const caller = createFakeCaller()
const randomCaller = createFakeCaller()
const topics: Topic[] = [
  {
    id: "1231",
    caller: randomCaller,
    unread: true,
    messages: [
      {
        author: randomCaller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content: "Idziemy na grzyby?",
      },
      {
        author: createFakeCaller(),
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1233",
    caller,
    unread: false,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1234",
    caller,
    unread: false,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
]
test("searches value - first name", () => {
  const searchValue = topics[0].caller.firstName as string
  expect(searchTopics(topics, searchValue)).toHaveLength(1)
})

test("fails search - first name", () => {
  expect(searchTopics(topics, "asdadaa")).toHaveLength(0)
})

test("searches value - last name", () => {
  const searchValue = topics[0].caller.lastName as string
  expect(searchTopics(topics, searchValue)).toHaveLength(1)
})

test("fails search - last name", () => {
  expect(searchTopics(topics, "ladakslodasiopd")).toHaveLength(0)
})

test("searches value - phone number", () => {
  const searchValue = topics[0].caller.phoneNumber
  expect(searchTopics(topics, searchValue)).toHaveLength(1)
})

test("fails search - phone number", () => {
  expect(searchTopics(topics, "+123 456 789")).toHaveLength(0)
})

test("searches value - messages", () => {
  const searchValue = topics[0].messages[0].content
  expect(searchTopics(topics, searchValue)).toHaveLength(1)
})

test("fails search - messages", () => {
  expect(searchTopics(topics, "lalal sadrsa")).toHaveLength(0)
})

test("no search value returns initial list", () => {
  expect(searchTopics(topics, "")).toBe(topics)
})
