/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  searchThreads,
  isPhoneNumberValid,
} from "App/messages/helpers/threads.helpers"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"
import { ContactsCollection } from "App/messages/helpers/messages.helpers"

const contact = createFakeContact()
const anotherContact = createFakeContact()
const firstThreadId = "1"
const secondThreadId = "2"

const threads: Thread[] = [
  {
    id: firstThreadId,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    phoneNumber: contact.primaryPhoneNumber!,
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
    messageType: MessageType.INBOX,
    contactId: undefined,
    contactName: undefined,
  },
  {
    id: secondThreadId,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    phoneNumber: anotherContact.primaryPhoneNumber!,
    lastUpdatedAt: new Date("2020-05-17T19:58:05.136Z"),
    messageSnippet:
      "Velit et ut ut odit quo. Ratione eligendi non consequatur ipsum neque.",
    unread: true,
    messageType: MessageType.INBOX,
    contactId: undefined,
    contactName: undefined,
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

describe("is phone number valid", () => {
  test("valid", () => {
    expect(isPhoneNumberValid("123")).toBe(true)
    expect(isPhoneNumberValid("123456789")).toBe(true)
    expect(isPhoneNumberValid("+123456789")).toBe(true)
  })

  test("invalid", () => {
    expect(isPhoneNumberValid("ORANGE")).toBe(false)
    expect(isPhoneNumberValid("123 456 789")).toBe(false)
    expect(isPhoneNumberValid("+123 456 789")).toBe(false)
    expect(isPhoneNumberValid("123ABC")).toBe(false)
  })
})
