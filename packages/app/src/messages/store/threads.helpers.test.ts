/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { searchThreads } from "App/messages/store/threads.helpers"
import { createFakeCaller } from "App/messages/helpers/create-fake-caller"
import { Thread } from "App/messages/store/messages.interface"

const caller = createFakeCaller()
const randomCaller = createFakeCaller()
const thread: Thread[] = [
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
  const searchValue = thread[0].caller.firstName as string
  expect(searchThreads(thread, searchValue)).toHaveLength(1)
})

test("fails search - first name", () => {
  expect(searchThreads(thread, "asdadaa")).toHaveLength(0)
})

test("searches value - last name", () => {
  const searchValue = thread[0].caller.lastName as string
  expect(searchThreads(thread, searchValue)).toHaveLength(1)
})

test("fails search - last name", () => {
  expect(searchThreads(thread, "ladakslodasiopd")).toHaveLength(0)
})

test("searches value - phone number", () => {
  const searchValue = thread[0].caller.phoneNumber
  expect(searchThreads(thread, searchValue)).toHaveLength(1)
})

test("fails search - phone number", () => {
  expect(searchThreads(thread, "+123 456 789")).toHaveLength(0)
})

test("searches value - messages", () => {
  const searchValue = thread[0].messages[0].content
  expect(searchThreads(thread, searchValue)).toHaveLength(1)
})

test("fails search - messages", () => {
  expect(searchThreads(thread, "lalal sadrsa")).toHaveLength(0)
})

test("no search value returns initial list", () => {
  expect(searchThreads(thread, "")).toBe(thread)
})
