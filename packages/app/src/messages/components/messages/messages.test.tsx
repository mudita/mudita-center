/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { Router } from "react-router"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { RenderOptions, RenderResult, prettyDOM } from "@testing-library/react"
import { createMemoryHistory } from "history"
import {
  constructWrapper,
  renderWithThemeAndIntl,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import Messages from "App/messages/components/messages/messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent, waitFor, findByTestId } from "@testing-library/dom"
import { act } from "@testing-library/react"
import {
  Receiver,
  ReceiverIdentification,
} from "App/messages/reducers/messages.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { TableTestIds } from "App/__deprecated__/renderer/components/core/table/table.enum"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { ThreadListTestIds } from "App/messages/components/thread-list-test-ids.enum"
import { MessagePanelTestIds } from "App/messages/components/messages-panel/messages-panel-test-ids.enum"
import { ThreadDetailsTextAreaTestIds } from "App/messages/components/thread-details-text-area-tests-ids"
import { ReceiverInputSelectTestIds } from "App/messages/components/receiver-input-search/receiver-input-search-test-ids.enum"
import { MessageType, ResultState } from "App/messages/constants"
import { Thread, Message } from "App/messages/dto"
import { flags } from "App/feature-flags"
import { NewMessageFormSidebarTestIds } from "App/messages/components/new-message-form-sidebar/new-message-form-sidebar-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import * as ContactSelectModalModule from "App/contacts/components/contacts-select-modal/contacts-select-modal.component"
import { PayloadAction } from "@reduxjs/toolkit"
import { CreateMessageDataResponse } from "App/messages/services"
import { State } from "App/core/constants"
import { InputSearchTestIds } from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import { Notification } from "App/notification/types"
import {
  NotificationType,
  NotificationMethod,
  NotificationResourceType,
} from "App/notification/constants"
import { MessageBubbleTestIds } from "App/messages/components/message-bubble/message-bubble-test-ids.enum"
import { DeleteMessageModalsTestIds } from "App/messages/components/delete-message-modals/delete-message-modals-test-ids.enum"
import * as AppUI from "App/ui"
import { DeleteThreadModalsTestIds } from "App/messages/components/delete-thread-modals/delete-thread-modals-test-ids.enum"

// jest.mock("App/ui", () => ({
//   useLoadingState: () => {
//     return {
//       states: {
//         messageDeleting: true,
//         messageDeletingInfo: true,
//       },
//       updateFieldState: jest.fn(),
//       resetState: jest.fn(),
//     }
//   },
// }))

const mockUseLoadingState = AppUI.useLoadingState as jest.MockedFunction<
  typeof AppUI.useLoadingState
>

jest.mock("App/feature-flags/helpers/feature-flag.helpers", () => ({
  flags: {
    get: () => true,
  },
}))

jest.mock("react-virtualized", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ReactVirtualized = jest.requireActual("react-virtualized")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...ReactVirtualized,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    AutoSizer: ({ children }: any) => children({ height: 1000, width: 1000 }),
  }
})

// jest.mock("App/src/ui/hooks/loading-state.hook", () => ({
//   useLoadingState: () => {
//     return {
//       states: {
//         messageDeleting: true,
//         messageDeletingInfo: true,
//       },
//       updateFieldState: jest.fn(),
//       resetState: jest.fn(),
//     }
//   },
// }))

const contact: Contact = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "123456789",
}

const unknownContact: Contact = {
  id: "2",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+123456123",
}

const contactsMap: Record<string, Contact> = {
  1: contact,
  2: unknownContact,
}

const unknownReceiver: Receiver = {
  phoneNumber: "20000000",
  identification: ReceiverIdentification.unknown,
}

const firstThreadId = "1"
const secondThreadId = "2"

const firstThread: Thread = {
  id: firstThreadId,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  phoneNumber: contact.primaryPhoneNumber!,
  unread: true,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

const secondThread: Thread = {
  id: secondThreadId,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  phoneNumber: unknownContact.primaryPhoneNumber!,
  unread: false,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

const incomingThread: Thread = {
  id: "3",
  phoneNumber: unknownReceiver.phoneNumber,
  unread: true,
  lastUpdatedAt: new Date("2019-10-18T11:45:35.112Z"),
  messageSnippet:
    "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

const receiver: Receiver = {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  phoneNumber: contact.primaryPhoneNumber!,
  firstName: contact.firstName,
  lastName: contact.lastName,
  identification: ReceiverIdentification.unknown,
}

const addNewMessageResponse = {
  payload: { messageParts: [{ thread: firstThread }] },
} as PayloadAction<CreateMessageDataResponse>

beforeAll(() => {
  mockAllIsIntersecting(true)
  Element.prototype.scrollIntoView = jest.fn()
})

type Props = ComponentProps<typeof Messages>

const defaultProps: Props = {
  threadsState: ResultState.Empty,
  threads: [],
  templates: [],
  receivers: [],
  searchValue: "",
  language: "en",
  loadThreads: jest.fn().mockReturnValue({ payload: undefined }),
  getReceiver: jest.fn().mockReturnValue(receiver),
  getContactByPhoneNumber: jest.fn(),
  addNewMessage: jest.fn(),
  getContact: jest.fn(),
  getMessagesStateByThreadId: jest.fn(),
  isContactCreatedByPhoneNumber: jest.fn(),
  getActiveMessagesByThreadIdSelector: jest.fn().mockReturnValue([contact]),
  removeLayoutNotification: jest.fn(),
  messageLayoutNotifications: [],
  currentlyDeletingMessageId: null,
  deleteMessage: jest.fn(),
  resendMessage: jest.fn(),
  updateMessage: jest.fn(),
  error: null,
  selectedItems: { rows: [] },
  toggleItem: jest.fn().mockReturnValue({ selectedItems: { rows: ["1"] } }),
  selectAllItems: jest.fn(),
  resetItems: jest.fn(),
  searchMessages: jest.fn(),
  searchMessagesForPreview: jest.fn(),
  searchResult: {},
  searchPreviewResult: {},
  state: State.Initial,
}

const propsWithSingleThread: Partial<Props> = {
  threadsState: ResultState.Loaded,
  threads: [firstThread],
  receivers: [receiver],
  loadThreads: jest.fn().mockReturnValue({ payload: undefined }),
  getReceiver: jest.fn().mockReturnValue(receiver),
  getContactByPhoneNumber: jest.fn(),
  addNewMessage: jest.fn(),
  getContact: jest.fn(),
  isContactCreatedByPhoneNumber: jest.fn(),
  getActiveMessagesByThreadIdSelector: jest.fn().mockReturnValue([
    {
      content: "Test Message #1",
      date: new Date("1970-01-01T00:06:31.000Z"),
      id: "1",
      messageType: "INBOX",
      phoneNumber: "123 456 789",
      threadId: "1",
    },
  ]),
}

type callback = (outcome: RenderResult) => void

type RenderProps = Partial<Props> & { callbacks?: callback[] }

const renderer = (
  { callbacks = [], ...extraProps }: RenderProps = { callbacks: [] },
  options?: Omit<RenderOptions, "queries">
) => {
  const history = createMemoryHistory()
  const storeMock = createMockStore([thunk])({
    contacts: {
      db: contactsMap,
      collection: ["1", "2"],
    },
  } as unknown as ReduxRootState)
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={storeMock}>
        <Messages {...props} />
      </Provider>
    </Router>,
    options
  )

  callbacks.forEach((callback) => callback(outcome))
  return {
    ...outcome,
    rerender: (newExtraProps: Partial<RenderProps>) => {
      const newProps = {
        ...defaultProps,
        ...newExtraProps,
      }
      outcome.rerender(
        constructWrapper(
          <Router history={history}>
            <Provider store={storeMock}>
              <Messages {...newProps} />
            </Provider>
          </Router>
        )
      )
    },
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

const putNewReceiverNumber = ({ queryByTestId }: RenderResult): void => {
  const input = queryByTestId(
    ReceiverInputSelectTestIds.Input
  ) as HTMLInputElement
  fireEvent.change(input, { target: { value: unknownReceiver.phoneNumber } })
}

const setNewMessageState = ({ queryByTestId }: RenderResult): void => {
  const button = queryByTestId(
    MessagePanelTestIds.NewMessageButton
  ) as HTMLElement
  fireEvent.click(button)
}

afterEach(() => {
  jest.clearAllMocks()
})

describe("Messages component", () => {
  describe("Render", () => {
    test("Search input filled", () => {
      const { queryByTestId } = renderer({
        threads: [firstThread, secondThread],
      })

      const searchText = "Test test"
      const input = queryByTestId(InputSearchTestIds.Input) as HTMLInputElement
      fireEvent.change(input, { target: { value: searchText } })
      fireEvent.keyDown(input, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      })

      expect(queryByTestId(MessagesTestIds.MessagesPanel)).toBeInTheDocument()
      expect(
        queryByTestId(MessagesTestIds.MessagesSearchResults)
      ).toBeInTheDocument()
    })

    test("Empty view, no threads", () => {
      const { queryByTestId } = renderer({ threads: [] })

      expect(queryByTestId(MessagesTestIds.MessagesPanel)).toBeInTheDocument()
      expect(
        queryByTestId(MessagesTestIds.EmptyThreadListState)
      ).toBeInTheDocument()
    })

    test("Threads present", () => {
      const { queryByTestId } = renderer({
        threads: [firstThread, secondThread],
      })

      expect(queryByTestId(MessagesTestIds.MessagesPanel)).toBeInTheDocument()
      expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()
    })

    test("Threads present, threads details visible", () => {
      const { queryAllByTestId, queryByTestId } = renderer({
        threads: [firstThread, secondThread],
      })

      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
      fireEvent.click(tableRow)

      expect(queryByTestId(MessagesTestIds.MessagesPanel)).toBeInTheDocument()
      expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()
      expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
    })

    test("Threads present, new message form visible", () => {
      const { queryByTestId } = renderer({
        threads: [firstThread, secondThread],
      })

      const button = queryByTestId(
        MessagePanelTestIds.NewMessageButton
      ) as HTMLElement
      fireEvent.click(button)

      expect(queryByTestId(MessagesTestIds.NewMessageForm)).toBeInTheDocument()
      expect(queryByTestId(MessagesTestIds.MessagesPanel)).toBeInTheDocument()
      expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()
    })
  })

  describe("effects", () => {
    test("Search is filled, then cleared and user is presented with Threads list", () => {
      const { queryByTestId } = renderer({
        threads: [firstThread, secondThread],
      })
      expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()

      const input = queryByTestId(InputSearchTestIds.Input) as HTMLInputElement
      fireEvent.change(input, { target: { value: "Test test" } })
      fireEvent.keyDown(input, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      })

      expect(
        queryByTestId(MessagesTestIds.MessagesSearchResults)
      ).toBeInTheDocument()

      fireEvent.change(input, { target: { value: "" } })
      fireEvent.keyDown(input, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      })
      expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()
    })

    test("Empty threads - no thread details visible", () => {
      const { queryByTestId } = renderer({
        threads: [],
      })
      expect(
        queryByTestId(MessagesTestIds.EmptyThreadListState)
      ).toBeInTheDocument()
      expect(
        queryByTestId(MessagesTestIds.ThreadDetails)
      ).not.toBeInTheDocument()
    })

    //how to test useEffect with timeouts?
    describe("timeouts", () => {
      test("delete message", async () => {
        jest.useFakeTimers()

        const { queryByTestId, queryAllByTestId, rerender } = renderer({
          threads: [firstThread, secondThread],
          getActiveMessagesByThreadIdSelector: jest.fn().mockReturnValue([
            {
              content: "Test Message #1",
              date: new Date("1970-01-01T00:06:31.000Z"),
              id: "1",
              messageType: "INBOX",
              phoneNumber: "123 456 789",
              threadId: "1",
            },
          ]),
        })

        const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
        fireEvent.click(tableRow)

        const messageBubble = queryByTestId(MessageBubbleTestIds.Container)
        messageBubble && fireEvent.mouseOver(messageBubble)

        const dropdown = queryByTestId(
          MessageBubbleTestIds.DropdownActionButton
        )
        dropdown && fireEvent.click(dropdown)

        const deleteButton = queryByTestId(
          MessageBubbleTestIds.DeleteMessageButton
        )
        deleteButton && fireEvent.click(deleteButton)

        const confirmDeleteButton = queryByTestId(
          ModalTestIds.ModalActionButton
        )
        confirmDeleteButton && fireEvent.click(confirmDeleteButton)

        rerender({ state: State.Loaded })

        jest.advanceTimersByTime(3000)

        expect(
          queryByTestId(DeleteMessageModalsTestIds.SuccessMessageDelete)
        ).toBeInTheDocument()

        jest.advanceTimersByTime(3000)

        expect(
          queryByTestId(DeleteMessageModalsTestIds.SuccessMessageDelete)
        ).not.toBeInTheDocument()

        jest.runOnlyPendingTimers()
        jest.useRealTimers()
      })

      test("delete thread", () => {
        jest.useFakeTimers()

        const { queryByTestId, queryAllByTestId, rerender, baseElement } =
          renderer({
            threads: [firstThread, secondThread],
            // getActiveMessagesByThreadIdSelector: jest.fn().mockReturnValue([
            //   {
            //     content: "Test Message #1",
            //     date: new Date("1970-01-01T00:06:31.000Z"),
            //     id: "1",
            //     messageType: "INBOX",
            //     phoneNumber: "123 456 789",
            //     threadId: "1",
            //   },
            // ]),
          })

        const threadOptions = queryAllByTestId("thread-row-toggler")[0]
        fireEvent.click(threadOptions)

        const deleteButton = queryByTestId("dropdown-delete")
        deleteButton && fireEvent.click(deleteButton)

        const confirmDelete = queryByTestId(ModalTestIds.ModalActionButton)
        confirmDelete && fireEvent.click(confirmDelete)

        jest.advanceTimersByTime(8000)
        rerender({ state: State.Loaded, threads: [secondThread] })
        console.log(prettyDOM(baseElement))

        //expect(confirmDelete).toBeInTheDocument()

        expect(
          queryByTestId("deleting-thread-modals-info-popup")
        ).toBeInTheDocument()

        // jest.advanceTimersByTime(3000)
        // expect(
        //   queryByTestId("deleting-thread-modals-info-popup")
        // ).not.toBeInTheDocument()

        jest.runOnlyPendingTimers()
        jest.useRealTimers()
      })
    })

    test("Messages component with two threads, for first details are opened and then this thread is removed - thread list is visible and thread details are closed", () => {
      const { queryAllByTestId, queryByTestId, rerender } = renderer({
        threads: [firstThread, secondThread],
      })

      const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
      fireEvent.click(tableRow)
      rerender({ threads: [secondThread] })

      expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()
      expect(
        queryByTestId(MessagesTestIds.ThreadDetails)
      ).not.toBeInTheDocument()
    })
  })

  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------

  test("Render MessagesPanel", () => {
    const { queryByTestId } = renderer()
    expect(queryByTestId(MessagesTestIds.MessagesPanel)).toBeInTheDocument()
  })

  test("Render with filled search input and visible search results", () => {
    const searchText = "Test test"
    const { queryByTestId } = renderer()
    const input = queryByTestId(InputSearchTestIds.Input) as HTMLInputElement
    fireEvent.change(input, { target: { value: searchText } })
    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    })

    expect(
      queryByTestId(MessagesTestIds.MessagesSearchResults)
    ).toBeInTheDocument()
  })

  test("Render EmptyThreadListState", () => {
    const { queryByTestId } = renderer({ threads: [] })
    expect(
      queryByTestId(MessagesTestIds.EmptyThreadListState)
    ).toBeInTheDocument()
  })

  test("Render ThreadList", () => {
    const { queryByTestId } = renderer({ threads: [firstThread] })
    expect(queryByTestId(MessagesTestIds.ThreadList)).toBeInTheDocument()
  })

  test("Render ThreadDetails", () => {
    const extraProps: Partial<Props> = {
      ...propsWithSingleThread,
    }
    const { queryAllByTestId, queryByTestId } = renderer(extraProps)
    const tableRow = queryAllByTestId(ThreadListTestIds.Row)[0]
    fireEvent.click(tableRow)
    expect(queryByTestId(MessagesTestIds.ThreadDetails)).toBeInTheDocument()
  })

  test("Render NewMessageForm", () => {
    const extraProps: Partial<Props> = {
      ...propsWithSingleThread,
    }
    const { queryByTestId } = renderer(extraProps)
    const button = queryByTestId(
      MessagePanelTestIds.NewMessageButton
    ) as HTMLElement
    fireEvent.click(button)
    expect(queryByTestId(MessagesTestIds.NewMessageForm)).toBeInTheDocument()
  })
})
