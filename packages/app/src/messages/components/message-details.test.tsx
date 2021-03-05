/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageDetails from "App/messages/components/message-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import {
  Message,
  MessageType,
  ResultsState,
  Thread,
} from "App/messages/store/messages.interface"
import { Contact } from "App/contacts/store/contacts.type"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const unknownContact = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "123 456 789",
  email: "hello@mudita.com",
  note: "",
  firstAddressLine: "",
}

const messages: Message[] = [
  {
    id: "2b7f9b1f-34c4-4b99-b028-9dbe388680d1",
    date: new Date("2020-01-02T04:05:06.242Z"),
    content:
      "Repudiandae necessitatibus distinctio iusto voluptatem consectetur consectetur. Numquam perspiciatis velit nulla sit.",
    contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    threadId: "+28755168255",
    messageType: MessageType.INBOX,
  },
  {
    id: "ecd314c7-4458-41c5-81c8-c258a54d7629",
    date: new Date("2020-01-25T05:18:36.599Z"),
    content:
      "Vero necessitatibus asperiores ut deserunt voluptas vitae est sed. Ex cum beatae aut accusantium libero.",
    contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    threadId: "+28755168255",
    messageType: MessageType.OUTBOX,
  },
  {
    id: "82e8b47e-46f1-4978-b13b-94fc4d2b3623",
    date: new Date("2019-10-09T16:28:52.372Z"),
    content:
      "Quaerat iure corrupti cumque quos porro natus. Nostrum est itaque dignissimos impedit sint tempore suscipit fugit.",
    contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    threadId: "+28755168255",
    messageType: MessageType.INBOX,
  },
  {
    id: "bc88cede-5767-45df-8c8b-2fdc40a25668",
    date: new Date("2020-06-05T01:10:28.991Z"),
    content:
      "Voluptatibus est odit in libero voluptates atque iste. Sit optio quae enim est harum dolores.",
    contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    threadId: "+28755168255",
    messageType: MessageType.INBOX,
  },
  {
    id: "fd2b4464-f1a4-4d14-9bb2-88e1569bf1dc",
    date: new Date("2019-08-24T14:28:36.475Z"),
    content:
      "Quidem eum est. Ipsum sit error veniam non vitae consequatur voluptate.",
    contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
    threadId: "+28755168255",
    messageType: MessageType.INBOX,
  },
]

const phoneNumberId = "123 456 789"

const contact: Contact = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: phoneNumberId,
  email: "hello@mudita.com",
  note: "",
  firstAddressLine: "",
}

const thread: Thread = {
  id: phoneNumberId,
  contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  lastUpdatedAt: new Date("2019-08-14T17:31:16.627Z"),
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: false,
}

const renderer = (extraProps?: {}) => {
  const defaultProps = {
    onDeleteClick: jest.fn(),
    onUnreadStatus: jest.fn(),
    onContactClick: jest.fn(),
    onAttachContactClick: jest.fn(),
    details: thread,
    getMessagesByThreadId: jest.fn(() => messages),
    getContactByContactId: jest.fn(() => contact),
    loadMessagesByThreadId: jest.fn(),
    getMessagesResultsMapStateByThreadId: jest.fn(),
  }
  return renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} {...extraProps} />
  )
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
  expect(getByTestId("sidebar-phone-number")).toHaveTextContent(thread.id)
})

test("correct amount of message bubbles is displayed", () => {
  const { getAllByTestId } = renderer({
    getMessagesResultsMapStateByThreadId: jest.fn(() => ResultsState.Loaded),
  })
  expect(getAllByTestId("message-content")).toHaveLength(messages.length)
})

test("message from unknown person displays only phone number", () => {
  const { getByTestId } = renderer({
    getContactByContactId: jest.fn(() => unknownContact),
  })
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(thread.id)
})

test("mark massage as unread", () => {
  const onClose = jest.fn()
  const onUnreadStatus = jest.fn()
  const { getByTestId } = renderer({ onClose, onUnreadStatus })
  fireEvent.click(getByTestId("icon-BorderCheckIcon"))
  expect(onUnreadStatus).toBeCalledWith([thread.id])
  expect(onClose).toBeCalled()
})

test("open contacts", () => {
  const onContactClick = jest.fn()
  const { getByTestId } = renderer({ onContactClick })
  fireEvent.click(getByTestId("icon-Contact"))
  expect(onContactClick).toBeCalled()
})

test("delete messages", () => {
  const onDeleteClick = jest.fn()
  const { getAllByTestId } = renderer({ onDeleteClick })
  fireEvent.click(getAllByTestId("icon-Delete")[0])
  expect(onDeleteClick).toBeCalledWith(thread.id)
})

test("show info about contact with multiple numbers", () => {
  const { getByTestId, getByText } = renderer({
    getContactByContactId: jest.fn(() => ({
      ...contact,
      secondaryPhoneNumber: thread.id,
    })),
  })
  expect(getByTestId("multiple-number")).toBeInTheDocument()
  expect(getByText("#2")).toBeInTheDocument()

})
