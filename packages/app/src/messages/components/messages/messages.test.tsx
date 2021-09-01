/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import Messages from "App/messages/components/messages/messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"
import { intl } from "Renderer/utils/intl"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import {
  Message,
  MessageType,
  Thread,
} from "App/messages/store/messages.interface"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"
import { Contact } from "App/contacts/store/contacts.type"
import { TableTestIds } from "Renderer/components/core/table/table.enum"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { RenderResult } from "@testing-library/react"

const contact = createFakeContact()

const unknownContact: Contact = {
  id: "11",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+123 456 123",
}

const firstThreadId = "1"
const secondThreadId = "2"

export const threads: Thread[] = [
  {
    id: firstThreadId,
    number: contact.primaryPhoneNumber!,
    contactId: contact.id,
    unread: true,
    lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
    messageSnippet:
      "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  },
  {
    id: secondThreadId,
    number: unknownContact.primaryPhoneNumber!,
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
    threadId: firstThreadId,
    number: contact.primaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.INBOX,
  },
  {
    id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
    date: new Date("2019-10-18T11:45:35.112Z"),
    content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    threadId: firstThreadId,
    number: contact.primaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.OUTBOX,
  },
]

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

type Props = ComponentProps<typeof Messages>

const defaultProps: Props = {
  threads,
  searchValue: "",
  language: "en",
  addNewMessage: jest.fn(),
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

type callback = (outcome: RenderResult) => void

type RenderProps = Partial<Props> & { callbacks?: callback[] }

const renderer = (
  { callbacks = [], ...extraProps }: RenderProps = { callbacks: [] }
) => {
  const history = createMemoryHistory()
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <Messages {...props} />
    </Router>
  )
  mockAllIsIntersecting(true)
  callbacks.forEach((callback) => callback(outcome))
  return {
    ...outcome,
  }
}

const setThreadDetailsState = ({ queryAllByTestId }: RenderResult): void => {
  const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
  fireEvent.click(tableRow)
}
const setNewMessageState = ({ queryByTestId }: RenderResult): void => {
  const button = queryByTestId(
    MessagePanelTestIds.NewMessageButton
  ) as HTMLElement
  fireEvent.click(button)
}

describe("Messages component", () => {
  describe("when messagesState is set to default value", () => {
    test("any sidebar isn't open", () => {
      const { queryByTestId } = renderer()
      expect(
        queryByTestId(MessagesTestIds.ThreadDetails)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(MessagesTestIds.NewMessageForm)
      ).not.toBeInTheDocument()
    })

    test("clicked thread row display ThreadDetails", () => {
      const { queryAllByTestId, queryByTestId } = renderer()
      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
      fireEvent.click(tableRow)
      expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
    })

    test("clicked new message button display NewMessageForm", () => {
      const { queryByTestId } = renderer()
      const button = queryByTestId(
        MessagePanelTestIds.NewMessageButton
      ) as HTMLElement
      fireEvent.click(button)
      expect(queryByTestId(MessagesTestIds.NewMessageForm)).toBeInTheDocument()
    })
  })

  describe("when messagesState is set to ThreadDetails", () => {
    const renderProps: RenderProps = { callbacks: [setThreadDetailsState] }

    test("ThreadDetails closes after clicking close button", () => {
      const { queryByTestId } = renderer(renderProps)
      const closeButton = queryByTestId(
        TableTestIds.SidebarClose
      ) as HTMLElement
      fireEvent.click(closeButton)
      expect(
        queryByTestId(MessagesTestIds.ThreadDetails)
      ).not.toBeInTheDocument()
    })

    test("clicked new message button display NewMessageForm", () => {
      const { queryByTestId } = renderer(renderProps)
      const button = queryByTestId(
        MessagePanelTestIds.NewMessageButton
      ) as HTMLElement
      fireEvent.click(button)
      expect(queryByTestId(MessagesTestIds.NewMessageForm)).toBeInTheDocument()
    })
  })

  describe("when messagesState is set to NewMessage", () => {
    const renderProps: RenderProps = { callbacks: [setNewMessageState] }

    test("NewMessageForm closes after clicking close button", () => {
      const { queryByTestId } = renderer(renderProps)
      const closeButton = queryByTestId(
        TableTestIds.SidebarClose
      ) as HTMLElement
      fireEvent.click(closeButton)
      expect(
        queryByTestId(MessagesTestIds.NewMessageForm)
      ).not.toBeInTheDocument()
    })

    test("clicked thread row display ThreadDetails", () => {
      const { queryByTestId, queryAllByTestId } = renderer(renderProps)
      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
      fireEvent.click(tableRow)
      expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
    })
  })

  test("when at least one checkbox is checked, all checkboxes are visible", () => {
    const { getAllByTestId } = renderer()
    const checkboxes = getAllByTestId("checkbox")
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeVisible())
    fireEvent.click(checkboxes[0])
    checkboxes.forEach((checkbox) => expect(checkbox).toBeVisible())
  })

  test("dropdown call button has correct content", () => {
    const { getAllByTestId } = renderer()
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
    expect(getAllByTestId("dropdown-call")).toHaveLength(threads.length)
  })

  test("dropdown contact details button has correct content", () => {
    const { getAllByTestId } = renderer()
    expect(getAllByTestId("dropdown-contact-details")[0]).toHaveTextContent(
      intl.formatMessage({
        id: "module.messages.dropdownContactDetails",
      })
    )
  })

  test("displays correct amount of dropdown contact details buttons for contacts", () => {
    const { getAllByTestId } = renderer()
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
    expect(queryAllByTestId("dropdown-add-to-contacts")[0]).toBeInTheDocument()
  })

  test("dropdown mark as read button has correct content ", () => {
    const { getAllByTestId } = renderer()
    expect(getAllByTestId("dropdown-mark-as-read")[0]).toHaveTextContent(
      intl.formatMessage({
        id: "module.messages.markAsRead",
      })
    )
  })

  test("displays correct amount of dropdown mark as read buttons", () => {
    const { getAllByTestId } = renderer()
    expect(getAllByTestId("dropdown-mark-as-read")).toHaveLength(threads.length)
  })

  test("dropdown delete button has correct content", () => {
    const { getAllByTestId } = renderer()
    expect(getAllByTestId("dropdown-delete")[0]).toHaveTextContent(
      intl.formatMessage({
        id: "module.messages.dropdownDelete",
      })
    )
  })

  test("displays correct amount of dropdown delete buttons", () => {
    const { getAllByTestId } = renderer()
    expect(getAllByTestId("dropdown-delete")).toHaveLength(threads.length)
  })
})
