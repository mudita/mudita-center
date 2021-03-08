/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import ThreadDetails, {
  ThreadDetailsProps,
} from "App/messages/components/thread-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import {
  Message,
  MessageType, ResultState,
  Thread,
} from "App/messages/store/messages.interface"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"
import { Contact } from "App/contacts/store/contacts.type"
import { ThreadDetailsTestIds } from "App/messages/components/thread-details-test-ids.enum"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const contact = createFakeContact()

const unknownContact: Contact = {
  id: "11",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+123 456 123",
}

const thread: Thread = {
  id: contact.primaryPhoneNumber!,
  contactId: contact.id,
  unread: true,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
}

const threadFromSecondPhoneNumber: Thread = {
  id: contact.secondaryPhoneNumber!,
  contactId: contact.id,
  unread: true,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
}

const threadFromUnknownCaller: Thread = {
  id: unknownContact.primaryPhoneNumber!,
  contactId: unknownContact.id,
  unread: true,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
}

const messages: Message[] = [
  {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: contact.secondaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.INBOX,
  },
  {
    id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
    date: new Date("2019-10-18T11:45:35.112Z"),
    content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    threadId: contact.secondaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.OUTBOX,
  },
]

const defaultProps: ThreadDetailsProps = {
  onClose: jest.fn(),
  onDeleteClick: jest.fn(),
  onUnreadStatus: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
  getMessagesByThreadId: jest.fn().mockReturnValue(messages),
  getContactByContactId: jest.fn().mockReturnValue(contact),
  loadMessagesByThreadId: jest.fn(),
  getMessagesResultsMapStateByThreadId: jest.fn(),
  thread,
}

const renderer = (extraProps?: {}) => {
  const props: ThreadDetailsProps = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<ThreadDetails {...props} />)

  return {
    ...outcome,
  }
}

test("sidebar close button informs parent about closing", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderer({ onClose })
  fireEvent.click(getByTestId("sidebar-close"))
  expect(onClose).toBeCalled()
})

test("left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderer()
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    `${contact.firstName} ${contact.lastName}`
  )
  expect(getByTestId("sidebar-phone-number")).toHaveTextContent(
    contact.primaryPhoneNumber!
  )
})

test("correct amount of message bubbles is displayed", () => {
  const { getAllByTestId } = renderer({
    getMessagesResultsMapStateByThreadId: jest.fn(() => ResultState.Loaded),
  })
  expect(getAllByTestId("message-content")).toHaveLength(messages.length)
})

test("message from unknown person displays only phone number", () => {
  const { getByTestId } = renderer({
    thread: threadFromUnknownCaller,
    getContactByContactId: jest.fn().mockReturnValue(unknownContact),
  })
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    unknownContact.primaryPhoneNumber!
  )
})

test("mark massage as unread", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderer({ onClose })
  fireEvent.click(getByTestId("icon-BorderCheckIcon"))
  expect(defaultProps.onUnreadStatus).toBeCalledWith([thread.id])
  expect(onClose).toBeCalled()
})

test("open contacts", () => {
  const { getByTestId } = renderer()
  fireEvent.click(getByTestId("icon-Contact"))
  expect(defaultProps.onContactClick).toBeCalled()
})

test("delete messages", () => {
  const { getAllByTestId } = renderer()
  fireEvent.click(getAllByTestId("icon-Delete")[0])
  expect(defaultProps.onDeleteClick).toBeCalledWith(thread.id)
})

test("show info about contact with multiple numbers", () => {
  const { getByTestId } = renderer()
  expect(getByTestId("multiple-number")).toBeInTheDocument()
})

test("show info about second number", () => {
  const { getByText } = renderer({ thread: threadFromSecondPhoneNumber })
  expect(getByText("#2")).toBeInTheDocument()
})

test("error modals fires when thread won't load", () => {
  const openErrorModal = jest.fn()
  const getMessagesResultsMapStateByThreadId = jest.fn(() => ResultState.Error)

  renderer({
    openErrorModal,
    getMessagesResultsMapStateByThreadId,
  })

  expect(openErrorModal).toHaveBeenCalled()
})

test("loader renders when thread is loading", () => {
  const getMessagesResultsMapStateByThreadId = jest.fn(
    () => ResultState.Loading
  )
  const { getByTestId } = renderer({
    getMessagesResultsMapStateByThreadId,
  })
  expect(getByTestId(ThreadDetailsTestIds.Loader)).toBeInTheDocument()
})
