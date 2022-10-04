/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Action, PayloadAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import {
  AddNewMessageAction,
  DeleteMessagePendingAction,
  MessagesState,
  ResendMessageFulfilledAction,
} from "App/messages/reducers/messages.interface"
import {
  initialState,
  messagesReducer,
} from "App/messages/reducers/messages.reducer"
import { Message, Thread } from "App/messages/dto"
import { MessageType, VisibilityFilter } from "App/messages/constants"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import { DeleteMessageAction } from "App/messages/reducers/messages.interface"
import { CoreEvent, State } from "App/core/constants"
import { SearchResult } from "App/search/dto"
import { SearchEvent } from "App/search/constants"
import { AppError } from "App/core/errors"

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
  messageType: MessageType.INBOX,
  contactId: undefined,
  contactName: undefined,
}

const messageOne: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const messageTwo: Message = {
  id: "aaf96416-e0c1-11ec-9d64-0242ac120002",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content: "Lorem ipsum viverra.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(messagesReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Toggle Thread Read Status data functionality", () => {
  test("Event: ToggleThreadsReadStatus update properly threadMap field", () => {
    const toggleThreadsReadStatusAction: PayloadAction<
      undefined,
      string,
      {
        arg: Thread[]
      }
    > = {
      type: pendingAction(MessagesEvent.ToggleThreadsReadStatus),
      payload: undefined,
      meta: { arg: [thread] },
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
          },
        },
        toggleThreadsReadStatusAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: { ...thread, unread: false },
        },
      },
    })
  })
})

describe("Mark Thread Read Status data functionality", () => {
  test("Event: MarkThreadsReadStatus/pending update properly threadMap field", () => {
    const markThreadsReadStatusAction: PayloadAction<
      undefined,
      string,
      {
        arg: Thread[]
      }
    > = {
      type: pendingAction(MessagesEvent.MarkThreadsReadStatus),
      payload: undefined,
      meta: { arg: [thread] },
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
          },
        },
        markThreadsReadStatusAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: { ...thread, unread: false },
        },
      },
    })
  })

  test("Event: MarkThreadsReadStatus/fulfilled update properly threadMap field", () => {
    const markThreadsReadStatusAction: PayloadAction<
      undefined,
      string,
      {
        arg: Thread[]
      }
    > = {
      type: fulfilledAction(MessagesEvent.MarkThreadsReadStatus),
      payload: undefined,
      meta: { arg: [thread] },
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
          },
        },
        markThreadsReadStatusAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: { ...thread, unread: false },
        },
      },
    })
  })
})

describe("Delete Threads data functionality", () => {
  test("Event DeleteThreads/pending sets loading state and clears error state", () => {
    const deleteThreadPendingAction: Action = {
      type: pendingAction(MessagesEvent.DeleteThreads),
    }
    expect(
      messagesReducer(
        {
          ...initialState,
          error: new AppError("some_error", "Oups!"),
        },
        deleteThreadPendingAction
      )
    ).toEqual({
      ...initialState,
      state: State.Loading,
      error: null,
    })
  })

  test("Event: DeleteThreads update properly threadMap field", () => {
    const deleteThreadsAction: PayloadAction<string[]> = {
      type: fulfilledAction(MessagesEvent.DeleteThreads),
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
          },
        },
        deleteThreadsAction
      )
    ).toEqual({
      ...initialState,
      state: State.Loaded,
      data: {
        ...initialState.data,
        threadMap: {},
      },
    })
  })

  test("Event: DeleteThreads update properly messageMap and messageIdsInThreadMap fields", () => {
    const deleteThreadsAction: PayloadAction<string[]> = {
      type: fulfilledAction(MessagesEvent.DeleteThreads),
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            messageMap: {
              [messageOne.id]: messageOne,
            },
            messageIdsInThreadMap: {
              [messageOne.threadId]: [messageOne.id],
            },
          },
        },
        deleteThreadsAction
      )
    ).toEqual({
      ...initialState,
      state: State.Loaded,
      data: {
        ...initialState.data,
        threadMap: {},
        messageMap: {},
        messageIdsInThreadMap: {},
      },
    })
  })

  test("Event: DeleteThreads update properly messageMap and messageIdsInThreadMap fields when exist more than one record", () => {
    const toDeleteThread: Thread = {
      id: "2",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
      messageType: MessageType.INBOX,
      contactId: undefined,
      contactName: undefined,
    }

    const toDeleteMessage: Message = {
      id: "M1",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      threadId: "2",
      phoneNumber: "+48 755 853 216",
      messageType: MessageType.INBOX,
    }

    const setThreadsAction: PayloadAction<string[]> = {
      type: fulfilledAction(MessagesEvent.DeleteThreads),
      payload: [toDeleteThread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
              [toDeleteThread.id]: toDeleteThread,
            },
            messageMap: {
              [messageOne.id]: messageOne,
              [toDeleteMessage.id]: toDeleteMessage,
            },
            messageIdsInThreadMap: {
              [messageOne.threadId]: [messageOne.id],
              [toDeleteMessage.threadId]: [toDeleteMessage.id],
            },
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: thread,
        },
        messageMap: {
          [messageOne.id]: messageOne,
        },
        messageIdsInThreadMap: {
          [messageOne.threadId]: [messageOne.id],
        },
      },
      state: State.Loaded,
    })
  })

  test("DeleteThreads/rejected sets error and error state", () => {
    const error = new AppError("some_type", "Oups!!!")
    const deleteThreadRejectedAction: PayloadAction<AppError> = {
      type: rejectedAction(MessagesEvent.DeleteThreads),
      payload: error,
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          error: null,
        },
        deleteThreadRejectedAction
      )
    ).toEqual({
      ...initialState,
      error,
      state: State.Failed,
    })
  })
})

describe("Change Visibility Filter data functionality", () => {
  test("Event: ChangeVisibilityFilter set properly visibilityFilter field", () => {
    const setThreadsAction: PayloadAction<
      MessagesState["data"]["visibilityFilter"]
    > = {
      type: MessagesEvent.ChangeVisibilityFilter,
      payload: VisibilityFilter.All,
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        visibilityFilter: VisibilityFilter.All,
      },
    })
  })

  test("Event: ChangeSearchValue set properly searchValue field", () => {
    const setThreadsAction: PayloadAction<string> = {
      type: MessagesEvent.ChangeSearchValue,
      payload: "search value",
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        searchValue: "search value",
      },
    })
  })
})

describe("Clear All Threads data functionality", () => {
  test("Event: ClearAllThreads clear properly threadMap, messageMap and messageIdsInThreadMap fields", () => {
    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            messageMap: {
              [messageOne.id]: messageOne,
            },
            messageIdsInThreadMap: {
              [messageOne.threadId]: [messageOne.id],
            },
          },
        },
        { type: MessagesEvent.ClearAllThreads }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {},
        messageMap: {},
        messageIdsInThreadMap: {},
      },
    })
  })
})

describe("Add New Message functionality", () => {
  test("Event: AddNewMessage saves all messages parts to the store", () => {
    const addNewMessagesAction: PayloadAction<AddNewMessageAction["payload"]> =
      {
        type: fulfilledAction(MessagesEvent.AddNewMessage),
        payload: {
          messageParts: [
            {
              message: messageOne,
              thread,
            },
            {
              message: messageTwo,
              thread,
            },
          ],
        },
      }

    expect(
      messagesReducer(
        {
          ...initialState,
        },
        addNewMessagesAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: thread,
        },
        messageMap: {
          [messageOne.id]: messageOne,
          [messageTwo.id]: messageTwo,
        },
        messageIdsInThreadMap: {
          [messageOne.threadId]: [messageOne.id, messageTwo.id],
        },
      },
    })
  })
})

describe("Delete message functionality", () => {
  test("Event DeleteMessage/pending sets loading state, sets delete id and clears error state", () => {
    const deleteMessagePendingAction: PayloadAction<
      DeleteMessagePendingAction["payload"],
      string,
      DeleteMessagePendingAction["meta"]
    > = {
      type: pendingAction(MessagesEvent.DeleteMessage),
      payload: undefined,
      meta: {
        arg: messageOne.id,
      },
    }
    expect(
      messagesReducer(
        {
          ...initialState,
          error: new AppError("some_error", "Oups!"),
        },
        deleteMessagePendingAction
      )
    ).toEqual({
      ...initialState,
      state: State.Loading,
      data: {
        ...initialState.data,
        currentlyDeletingMessageId: messageOne.id,
      },
      error: null,
    })
  })

  test("Event: DeleteMessage removes the message from the store", () => {
    const deleteMessageAction: PayloadAction<DeleteMessageAction["payload"]> = {
      type: fulfilledAction(MessagesEvent.DeleteMessage),
      payload: messageOne.id,
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            messageMap: {
              [messageOne.id]: messageOne,
              [messageTwo.id]: messageTwo,
            },
            messageIdsInThreadMap: {
              [thread.id]: [messageOne.id, messageTwo.id],
            },
          },
        },
        deleteMessageAction
      )
    ).toEqual({
      ...initialState,
      state: State.Loaded,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: thread,
        },
        messageMap: {
          [messageTwo.id]: messageTwo,
        },
        messageIdsInThreadMap: {
          [thread.id]: [messageTwo.id],
        },
      },
    })
  })
  test("Event: DeleteMessage removes thread when the message is the last one", () => {
    const deleteMessageAction: PayloadAction<DeleteMessageAction["payload"]> = {
      type: fulfilledAction(MessagesEvent.DeleteMessage),
      payload: messageOne.id,
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            messageMap: {
              [messageOne.id]: messageOne,
            },
            messageIdsInThreadMap: {
              [thread.id]: [messageOne.id],
            },
          },
        },
        deleteMessageAction
      )
    ).toEqual({
      ...initialState,
      state: State.Loaded,
      data: {
        ...initialState.data,
        threadMap: {},
        messageMap: {},
        messageIdsInThreadMap: {},
      },
    })
  })

  test("deleting flow sets proper messagesDeletingState and currentlyDeletingMessageId states", () => {
    const deleteMessagePendingAction: PayloadAction<
      DeleteMessagePendingAction["payload"],
      string,
      DeleteMessagePendingAction["meta"]
    > = {
      type: pendingAction(MessagesEvent.DeleteMessage),
      payload: undefined,
      meta: {
        arg: messageOne.id,
      },
    }

    const deleteMessageFulfilledAction: PayloadAction<
      DeleteMessageAction["payload"]
    > = {
      type: fulfilledAction(MessagesEvent.DeleteMessage),
      payload: messageOne.id,
    }
    const deleteMessageRejectedAction: Action = {
      type: rejectedAction(MessagesEvent.DeleteMessage),
    }

    const testcaseInitialState = {
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: thread,
        },
        messageMap: {
          [messageOne.id]: messageOne,
          [messageTwo.id]: messageTwo,
        },
        messageIdsInThreadMap: {
          [thread.id]: [messageOne.id, messageTwo.id],
        },
      },
    }

    const stateAfterPendingAction = messagesReducer(
      { ...testcaseInitialState },
      deleteMessagePendingAction
    )
    const stateAfterFulfilledAction = messagesReducer(
      { ...stateAfterPendingAction },
      deleteMessageFulfilledAction
    )
    const stateAfterRejectedAction = messagesReducer(
      { ...stateAfterPendingAction },
      deleteMessageRejectedAction
    )

    expect(stateAfterPendingAction).toMatchObject({
      data: {
        currentlyDeletingMessageId: messageOne.id,
      },
    })
    expect(stateAfterFulfilledAction).toMatchObject({
      data: {
        currentlyDeletingMessageId: null,
      },
    })
    expect(stateAfterRejectedAction).toMatchObject({
      data: {
        currentlyDeletingMessageId: null,
      },
    })
  })

  test("DeleteMessage/Rejected sets error and failed state", () => {
    const error = new AppError("some_type", "Oups!!!")
    const deleteMessageRejectedAction: PayloadAction<AppError> = {
      type: rejectedAction(MessagesEvent.DeleteMessage),
      payload: error,
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          error: null,
        },
        deleteMessageRejectedAction
      )
    ).toEqual({
      ...initialState,
      error,
      state: State.Failed,
    })
  })
})

describe("Checkboxes manage", () => {
  const secondThread: Thread = {
    id: "2",
    phoneNumber: "+48 444 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet: "Exercitationem vel quasi doloremque.",
    unread: true,
    messageType: MessageType.INBOX,
    contactId: undefined,
    contactName: undefined,
  }

  test("Event: SelectAll set selectedItems rows to array with all thread ids", () => {
    const setThreadsAction: PayloadAction<string[]> = {
      type: fulfilledAction(MessagesEvent.SelectAll),
      payload: [thread.id, secondThread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
              [secondThread.id]: secondThread,
            },
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: thread,
          [secondThread.id]: secondThread,
        },
      },
      selectedItems: { rows: [thread.id, secondThread.id] },
    })
  })

  test("Event: ToggleItem set properly selectedItems rows", () => {
    const setThreadsAction: PayloadAction<string[]> = {
      type: fulfilledAction(MessagesEvent.ToggleItem),
      payload: [thread.id],
    }
    expect(
      messagesReducer(
        {
          ...initialState,
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      selectedItems: { rows: [thread.id] },
    })
  })

  test("Event: ResetItems clear properly selectedItems rows field", () => {
    expect(
      messagesReducer(
        {
          ...initialState,
          selectedItems: { rows: [thread.id, secondThread.id] },
        },
        { type: MessagesEvent.ResetItems }
      )
    ).toEqual({
      ...initialState,
      selectedItems: { rows: [] },
    })
  })

  test("Event: CoreEvent.ChangeLocation removes all selected items", () => {
    expect(
      messagesReducer(
        {
          ...initialState,
          selectedItems: { rows: [thread.id, secondThread.id] },
        },
        {
          type: CoreEvent.ChangeLocation,
          payload: undefined,
        }
      )
    ).toEqual({
      ...initialState,
      selectedItems: { rows: [] },
    })
  })
})
describe("Searching messages", () => {
  test("Searching by message content returns proper value", () => {
    const searchMessagesAction: PayloadAction<SearchResult> = {
      type: fulfilledAction(SearchEvent.SearchData),
      payload: { message: [messageOne], thread: [thread] },
    }
    expect(
      messagesReducer(
        {
          ...initialState,
        },
        searchMessagesAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        searchResult: { message: [messageOne], thread: [thread] },
      },
    })
  })
})

describe("ResendMessage", () => {
  test("ResendMessage/pending clears error state", () => {
    const deleteThreadPendingAction: Action = {
      type: pendingAction(MessagesEvent.ResendMessage),
    }
    expect(
      messagesReducer(
        {
          ...initialState,
          error: new AppError("some_error", "Oups!"),
        },
        deleteThreadPendingAction
      )
    ).toEqual({
      ...initialState,
      error: null,
    })
  })

  test("ResendMessage/fulfilled adds parts of the resent message to the store", () => {
    const otherMessage: Message = {
      ...messageOne,
      id: "some-mocked-id",
      content: "Hello world!",
    }
    const addNewMessagesAction: PayloadAction<
      ResendMessageFulfilledAction["payload"]
    > = {
      type: fulfilledAction(MessagesEvent.ResendMessage),
      payload: {
        messageParts: [
          {
            message: messageOne,
            thread,
          },
          {
            message: messageTwo,
            thread,
          },
        ],
      },
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            messageMap: {
              [otherMessage.id]: otherMessage,
            },
            messageIdsInThreadMap: {
              [otherMessage.threadId]: [otherMessage.id],
            },
          },
        },
        addNewMessagesAction
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        threadMap: {
          [thread.id]: thread,
        },
        messageMap: {
          [messageOne.id]: messageOne,
          [messageTwo.id]: messageTwo,
          [otherMessage.id]: otherMessage,
        },
        messageIdsInThreadMap: {
          [messageOne.threadId]: [
            otherMessage.id,
            messageOne.id,
            messageTwo.id,
          ],
        },
      },
    })
  })

  test("ResendMessage/rejected sets error and error state", () => {
    const error = new AppError("some_type", "Oups!!!")
    const resendMessageRejectedAction: PayloadAction<AppError> = {
      type: rejectedAction(MessagesEvent.ResendMessage),
      payload: error,
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          error: null,
        },
        resendMessageRejectedAction
      )
    ).toEqual({
      ...initialState,
      error,
      state: State.Failed,
    })
  })
})
