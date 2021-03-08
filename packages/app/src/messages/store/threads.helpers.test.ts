/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { searchThreads } from "App/messages/store/threads.helpers"
import { Thread } from "App/messages/store/messages.interface"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"
import { ContactsCollection } from "App/messages/store/messages.helpers"

const contact = createFakeContact()
const anotherContact = createFakeContact()

export const threads: Thread[] = [
  {
    id: contact.primaryPhoneNumber!,
    contactId: contact.id,
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  },
  {
    id: anotherContact.primaryPhoneNumber!,
    contactId: anotherContact.id,
    lastUpdatedAt: new Date("2020-05-17T19:58:05.136Z"),
    messageSnippet:
      "Velit et ut ut odit quo. Ratione eligendi non consequatur ipsum neque.",
    unread: true,
  },
]

const contactsMock: ContactsCollection = {
  [contact.id]: contact,
}

test("searches value - first name", () => {
  const searchValue = contact.firstName as string
  expect(searchThreads(threads, contactsMock, searchValue)).toHaveLength(1)
})

test("fails search - first name", () => {
  expect(searchThreads(threads, contactsMock, "asdadaa")).toHaveLength(0)
})

test("searches value - last name", () => {
  const searchValue = contact.lastName as string
  expect(searchThreads(threads, contactsMock, searchValue)).toHaveLength(1)
})

test("fails search - last name", () => {
  expect(searchThreads(threads, contactsMock, "ladakslodasiopd")).toHaveLength(
    0
  )
})

test("searches value - phone number", () => {
  const searchValue = contact.primaryPhoneNumber!
  expect(searchThreads(threads, contactsMock, searchValue)).toHaveLength(1)
})

test("fails search - phone number", () => {
  expect(searchThreads(threads, contactsMock, "+123 456 789")).toHaveLength(0)
})

test("fails search - messages", () => {
  expect(searchThreads(threads, contactsMock, "lalal sadrsa")).toHaveLength(0)
})

test("no search value returns initial list", () => {
  expect(searchThreads(threads, contactsMock, "")).toBe(threads)
})
