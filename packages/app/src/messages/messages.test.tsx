/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Messages, { MessagesProps } from "./messages-ui.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"
import { intl } from "Renderer/utils/intl"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import {
  Message,
  MessageType,
  Thread,
} from "App/messages/store/messages.interface"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"
import { Contact } from "App/contacts/store/contacts.type"

const contact = createFakeContact()

const unknownContact: Contact = {
  id: "11",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+123 456 123",
}

export const threads: Thread[] = [
  {
    id: contact.primaryPhoneNumber!,
    contactId: contact.id,
    unread: true,
    lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
    messageSnippet:
      "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  },
  {
    id: unknownContact.primaryPhoneNumber!,
    contactId: unknownContact.id,
    unread: false,
    lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
    messageSnippet:
      "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  },
]

const messages: Message[] = [
  {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: contact.primaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.INBOX,
  },
  {
    id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
    date: new Date("2019-10-18T11:45:35.112Z"),
    content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    threadId: contact.primaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.OUTBOX,
  },
]

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const defaultProps: MessagesProps = {
  threads,
  searchValue: "",
  language: "en",
  getContact: jest.fn().mockReturnValue(contact),
  getMessagesByThreadId: jest.fn().mockReturnValue(messages),
  getMessagesResultMapStateByThreadId: jest.fn(),
  loadMessagesByThreadId: jest.fn(),
  isContactCreated: jest.fn().mockReturnValue(true),
  attachContactList: [
    {
      category: contact.lastName?.charAt(0) ?? "#",
      contacts: [contact],
    },
  ],
  attachContactFlatList: [contact],
}

const renderer = (extraProps?: {}) => {
  const history = createMemoryHistory()
  const props: MessagesProps = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <Messages {...props} />
    </Router>
  )
  return {
    ...outcome,
  }
}

test("sidebar is hidden by default", () => {
  const { queryByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("clicked row display sidebar", () => {
  const { getAllByTestId, getByTestId } = renderer()
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  expect(getByTestId("sidebar")).toBeInTheDocument()
})

test("sidebar closes after clicking close button", () => {
  const { getAllByTestId, getByTestId, queryByTestId } = renderer()
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  const closeButton = getByTestId("sidebar-close")
  fireEvent.click(closeButton)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("when at least one checkbox is checked, all checkboxes are visible", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeVisible())
  fireEvent.click(checkboxes[0])
  checkboxes.forEach((checkbox) => expect(checkbox).toBeVisible())
})

test("dropdown call button has correct content", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "component.dropdownCall",
      },
      { name: contact.firstName }
    )
  )
})

test("displays correct amount of dropdown call buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")).toHaveLength(threads.length)
})

test("dropdown contact details button has correct content", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-contact-details")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "module.messages.dropdownContactDetails",
    })
  )
})

test("displays correct amount of dropdown contact details buttons for contacts", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-contact-details")).toHaveLength(2)
})

test("displays correct amount of dropdown add to contacts buttons for person that is unknown", () => {
  const { queryAllByTestId } = renderer({
    getContact: jest.fn().mockReturnValue({
      id: unknownContact.id,
      firstName: unknownContact.firstName,
      lastName: unknownContact.lastName,
      primaryPhoneNumber: unknownContact.primaryPhoneNumber,
    }),
    isContactCreated: jest.fn().mockReturnValue(false),
  })
  mockAllIsIntersecting(true)
  expect(queryAllByTestId("dropdown-add-to-contacts")[0]).toBeInTheDocument()
})

test("dropdown mark as read button has correct content ", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-mark-as-read")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "module.messages.markAsRead",
    })
  )
})

test("displays correct amount of dropdown mark as read buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-mark-as-read")).toHaveLength(threads.length)
})

test("dropdown delete button has correct content", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-delete")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "module.messages.dropdownDelete",
    })
  )
})

test("displays correct amount of dropdown delete buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-delete")).toHaveLength(threads.length)
})

test("when at least one checkbox is checked, selection manager is displayed", () => {
  const { getAllByTestId, getByTestId } = renderer()
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  fireEvent.click(checkboxes[0])
  expect(getByTestId(MessagePanelTestIds.SelectionManager)).toBeInTheDocument()
})
