/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  initialState,
  messagesReducer,
} from "App/messages/reducers/messages.reducer"
import { MessagesEvent, ThreadDeletingState } from "App/messages/constants"
import {
  AddNewMessageAction,
  Message,
  MessagesState,
  MessageType,
  Thread,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import { PayloadAction } from "@reduxjs/toolkit"
import { fulfilledAction, pendingAction } from "App/__deprecated__/renderer/store/helpers"

test("empty event returns initial state", () => {
  expect(messagesReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Toggle Thread Read Status data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

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
          threadMap: {
            [thread.id]: thread,
          },
        },
        toggleThreadsReadStatusAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: { ...thread, unread: false },
      },
    })
  })
})

describe("Mark Thread Read Status data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

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
          threadMap: {
            [thread.id]: thread,
          },
        },
        markThreadsReadStatusAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: { ...thread, unread: false },
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
          threadMap: {
            [thread.id]: thread,
          },
        },
        markThreadsReadStatusAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: { ...thread, unread: false },
      },
    })
  })
})

describe("Delete Threads data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  const message: Message = {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  test("Event: DeleteThreads update properly threadMap field", () => {
    const deleteThreadsAction: PayloadAction<string[]> = {
      type: fulfilledAction(MessagesEvent.DeleteThreads),
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        deleteThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {},
      deletingState: ThreadDeletingState.Success,
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
          threadMap: {
            [thread.id]: thread,
          },
          messageMap: {
            [message.id]: message,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
          },
        },
        deleteThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {},
      messageMap: {},
      messageIdsInThreadMap: {},
      deletingState: ThreadDeletingState.Success,
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
          threadMap: {
            [thread.id]: thread,
            [toDeleteThread.id]: toDeleteThread,
          },
          messageMap: {
            [message.id]: message,
            [toDeleteMessage.id]: toDeleteMessage,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
            [toDeleteMessage.threadId]: [toDeleteMessage.id],
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: thread,
      },
      messageMap: {
        [message.id]: message,
      },
      messageIdsInThreadMap: {
        [message.threadId]: [message.id],
      },
      deletingState: ThreadDeletingState.Success,
    })
  })
})

describe("Change Visibility Filter data functionality", () => {
  test("Event: ChangeVisibilityFilter set properly visibilityFilter field", () => {
    const setThreadsAction: PayloadAction<MessagesState["visibilityFilter"]> = {
      type: MessagesEvent.ChangeVisibilityFilter,
      payload: VisibilityFilter.All,
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      visibilityFilter: VisibilityFilter.All,
    })
  })
})

describe("Change Visibility Filter data functionality", () => {
  test("Event: ChangeSearchValue set properly searchValue field", () => {
    const setThreadsAction: PayloadAction<string> = {
      type: MessagesEvent.ChangeSearchValue,
      payload: "search value",
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      searchValue: "search value",
    })
  })
})

describe("Clear All Threads data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  const message: Message = {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  test("Event: ClearAllThreads clear properly threadMap, messageMap and messageIdsInThreadMap fields", () => {
    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
          messageMap: {
            [message.id]: message,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
          },
        },
        { type: MessagesEvent.ClearAllThreads }
      )
    ).toEqual({
      ...initialState,
      threadMap: {},
      messageMap: {},
      messageIdsInThreadMap: {},
    })
  })
})

describe("Add New Message functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  const messagePartOne: Message = {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  const messagePartTwo: Message = {
    id: "aaf96416-e0c1-11ec-9d64-0242ac120002",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content: "Lorem ipsum viverra.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  test("Event: AddNewMessage saves all messages parts to the store", () => {
    const addNewMessagesAction: PayloadAction<AddNewMessageAction["payload"]> =
      {
        type: fulfilledAction(MessagesEvent.AddNewMessage),
        payload: {
          messageParts: [
            {
              message: messagePartOne,
              thread,
            },
            {
              message: messagePartTwo,
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
      threadMap: {
        [thread.id]: thread,
      },
      messageMap: {
        [messagePartOne.id]: messagePartOne,
        [messagePartTwo.id]: messagePartTwo,
      },
      messageIdsInThreadMap: {
        [messagePartOne.threadId]: [messagePartOne.id, messagePartTwo.id],
      },
    })
  })
})
