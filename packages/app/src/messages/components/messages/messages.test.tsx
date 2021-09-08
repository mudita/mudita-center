/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { intl } from "Renderer/utils/intl"
import { Router } from "react-router"
import { RenderResult } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import Messages from "App/messages/components/messages/messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent, waitFor } from "@testing-library/dom"
import {
  Receiver,
  ReceiverIdentification,
  Thread,
} from "App/messages/store/messages.interface"
import { Contact } from "App/contacts/store/contacts.type"
import { TableTestIds } from "Renderer/components/core/table/table.enum"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { ThreadDetailsTextAreaTestIds } from "App/messages/components/thread-details-text-area-tests-ids"
import { ReceiverInputSelectTestIds } from "App/messages/components/receiver-input-search/receiver-input-search-test-ids.enum"

const contact: Contact = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "123 456 789",
}

const unknownContact: Contact = {
  id: "2",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+123 456 123",
}

const firstThreadId = "1"
const secondThreadId = "2"

const firstThread: Thread = {
  id: firstThreadId,
  phoneNumber: contact.primaryPhoneNumber!,
  contactId: contact.id,
  unread: true,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
}

const secondThread: Thread = {
  id: secondThreadId,
  phoneNumber: unknownContact.primaryPhoneNumber!,
  contactId: unknownContact.id,
  unread: false,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
}

const receiver: Receiver = {
  phoneNumber: contact.primaryPhoneNumber!,
  contactId: contact.id,
  firstName: contact.firstName,
  lastName: contact.lastName,
  identification: ReceiverIdentification.unknown,
}

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

type Props = ComponentProps<typeof Messages>

const defaultProps: Props = {
  threads: [firstThread],
  receivers: [receiver],
  searchValue: "",
  language: "en",
  getReceiver: jest.fn().mockReturnValue(receiver),
  getContactByPhoneNumber: jest.fn(),
  addNewMessage: jest.fn(),
  getContact: jest.fn(),
  getMessagesByThreadId: jest.fn(),
  getMessagesResultMapStateByThreadId: jest.fn(),
  loadMessagesByThreadId: jest.fn(),
  isContactCreated: jest.fn(),
  attachContactList: [],
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

const setMockContent = ({ queryByTestId }: RenderResult): void => {
  const input = queryByTestId(
    ThreadDetailsTextAreaTestIds.Input
  ) as HTMLInputElement
  fireEvent.change(input, { target: { value: "mock" } })
}

const putReceiverNumber = ({ queryByTestId }: RenderResult): void => {
  const input = queryByTestId(
    ReceiverInputSelectTestIds.Input
  ) as HTMLInputElement
  fireEvent.change(input, { target: { value: firstThread.phoneNumber } })
}

const setNewMessageState = ({ queryByTestId }: RenderResult): void => {
  const button = queryByTestId(
    MessagePanelTestIds.NewMessageButton
  ) as HTMLElement
  fireEvent.click(button)
}

describe("Messages component", () => {
  describe("when component is render with defaults props", () => {
    test("length of thread list should be correct", () => {
      const { queryByTestId } = renderer()
      expect(queryByTestId(ThreadListTestIds.Row)).toBeInTheDocument()
    })

    test("length of passed empty thread list should be equal 0", () => {
      const { queryByTestId } = renderer({ threads: [] })
      expect(queryByTestId(ThreadListTestIds.Row)).not.toBeInTheDocument()
    })

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

  describe("when ThreadDetails is open", () => {
    const renderProps: RenderProps = { callbacks: [setThreadDetailsState] }

    test("value of new message text area is empty", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      expect(input.value).toBe("")
    })

    test("is possible to write content in a new message text area", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      fireEvent.change(input, { target: { value: "a" } })
      expect(input.value).toBe("a")
    })

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

  describe("when NewMessageForm is open", () => {
    const renderProps: RenderProps = { callbacks: [setNewMessageState] }

    test("length of thread list is increased by 1 (tmp thread)", async () => {
      const { queryByTestId } = renderer({ ...renderProps, threads: [] })
      expect(queryByTestId(ThreadListTestIds.Row)).toBeInTheDocument()
    })

    test("value of new message text area is empty", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      expect(input.value).toBe("")
    })

    test("is possible to write content in a new message text area", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      fireEvent.change(input, { target: { value: "a" } })
      expect(input.value).toBe("a")
    })

    test("value of receiver input is empty", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ReceiverInputSelectTestIds.Input
      ) as HTMLInputElement
      expect(input.value).toBe("")
    })

    test("is possible to search receiver or write phone number in a receiver input", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ReceiverInputSelectTestIds.Input
      ) as HTMLInputElement
      fireEvent.change(input, { target: { value: "a" } })
      expect(input.value).toBe("a")
    })

    test("choosing the receiver at form opens ThreadDetails component", async () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ReceiverInputSelectTestIds.Input
      ) as HTMLInputElement
      fireEvent.change(input, { target: { value: "John" } })
      fireEvent.keyDown(input, { keyCode: 40 })
      fireEvent.keyDown(input, { keyCode: 13 })
      await waitFor(() => {
        expect(
          queryByTestId(MessagesTestIds.NewMessageForm)
        ).not.toBeInTheDocument()
        expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
      })
    })

    test("choosing the receiver no clears a content in text area", async () => {
      const { queryByTestId } = renderer(renderProps)
      const textAreaInput = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      fireEvent.change(textAreaInput, { target: { value: "a" } })

      const input = queryByTestId(
        ReceiverInputSelectTestIds.Input
      ) as HTMLInputElement
      fireEvent.change(input, { target: { value: "John" } })
      fireEvent.keyDown(input, { keyCode: 40 })
      fireEvent.keyDown(input, { keyCode: 13 })
      await waitFor(() => {
        expect(textAreaInput.value).toBe("a")
      })
    })

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
      const { queryAllByTestId, queryByTestId } = renderer(renderProps)
      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[1]
      fireEvent.click(tableRow)
      expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
    })
  })

  describe("when ThreadDetails is open with some content", () => {
    const renderProps: RenderProps = {
      callbacks: [setThreadDetailsState, setMockContent],
    }

    test("value of new message text area is mocked", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      expect(input.value).toBe("mock")
    })

    test("component emit addNewMessage event when Send Button is clicked", () => {
      const addNewMessage = jest.fn()
      const { queryByTestId } = renderer({ ...renderProps, addNewMessage })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      expect(addNewMessage).toBeCalled()
    })

    test("value of new message text area is empty after add new message", async () => {
      const addNewMessage = jest
        .fn()
        .mockReturnValue(Promise.resolve({ threadId: firstThread.id }))
      const { queryByTestId } = renderer({ ...renderProps, addNewMessage })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      await waitFor(() => {
        expect(input.value).toBe("")
      })
    })

    test("value of new message text area isn't cleared after clicked active thread row", async () => {
      const { queryByTestId, queryAllByTestId } = renderer(renderProps)
      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
      fireEvent.click(tableRow)

      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      await waitFor(() => {
        expect(input.value).not.toBe("")
      })
    })

    test("value of new message text area is cleared after clicked another thread row", async () => {
      const { queryByTestId, queryAllByTestId } = renderer({
        ...renderProps,
        threads: [firstThread, secondThread],
      })
      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[1]
      fireEvent.click(tableRow)

      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      await waitFor(() => {
        expect(input.value).toBe("")
      })
    })
  })

  describe("when NewMessageForm is open with some content (without chose receiver)", () => {
    const renderProps: RenderProps = {
      callbacks: [setNewMessageState, setMockContent],
    }

    test("value of new message text area is mocked", () => {
      const { queryByTestId } = renderer(renderProps)
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      expect(input.value).toBe("mock")
    })

    test("component no emit addNewMessage event when Send Button is clicked", () => {
      const addNewMessage = jest.fn()
      const { queryByTestId } = renderer({ ...renderProps, addNewMessage })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      expect(addNewMessage).not.toBeCalled()
    })
  })

  describe("when NewMessageForm is open with some content and receiver number is put", () => {
    const renderProps: RenderProps = {
      callbacks: [setNewMessageState, setMockContent, putReceiverNumber],
    }

    test("component emit addNewMessage event when Send Button is clicked ", () => {
      const addNewMessage = jest.fn()
      const { queryByTestId } = renderer({ ...renderProps, addNewMessage })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      expect(addNewMessage).toBeCalled()
    })

    test("ThreadDetails component is open after add new message", async () => {
      const addNewMessage = jest
        .fn()
        .mockReturnValue(Promise.resolve({ threadId: firstThread.id }))
      const { queryByTestId } = renderer({ ...renderProps, addNewMessage })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      await waitFor(() => {
        expect(
          queryByTestId(MessagesTestIds.NewMessageForm)
        ).not.toBeInTheDocument()
        expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
      })
    })

    test("value of new message text area is empty after add new message", async () => {
      const addNewMessage = jest
        .fn()
        .mockReturnValue(Promise.resolve({ threadId: firstThread.id }))
      const { queryByTestId } = renderer({ ...renderProps, addNewMessage })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      const input = queryByTestId(
        ThreadDetailsTextAreaTestIds.Input
      ) as HTMLInputElement
      await waitFor(() => {
        expect(input.value).toBe("")
      })
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
    const { getByTestId } = renderer()
    expect(getByTestId("dropdown-call")).toBeInTheDocument()
  })

  test("dropdown contact details button has correct content", () => {
    const isContactCreated = jest.fn().mockReturnValue(true)
    const { getAllByTestId } = renderer({ isContactCreated })
    expect(getAllByTestId("dropdown-contact-details")[0]).toHaveTextContent(
      intl.formatMessage({
        id: "module.messages.dropdownContactDetails",
      })
    )
  })

  test("displays correct amount of dropdown contact details buttons for contacts", () => {
    const isContactCreated = jest.fn().mockReturnValue(true)
    const { getByTestId } = renderer({ isContactCreated })
    expect(getByTestId("dropdown-contact-details")).toBeInTheDocument()
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
    const { getByTestId } = renderer()
    expect(getByTestId("dropdown-mark-as-read")).toBeInTheDocument()
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
    const { getByTestId } = renderer()
    expect(getByTestId("dropdown-delete")).toBeInTheDocument()
  })
})
