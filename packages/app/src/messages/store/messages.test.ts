/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import messages, {
  initialState as messagesInitialState,
} from "App/messages/store/messages"
import { initialState as contactsInitialState } from "App/contacts/store/contacts"
import contacts from "App/contacts/store/contacts"
import {
  Message,
  MessageType,
  ResultState,
  Thread,
  VisibilityFilter,
} from "App/messages/store/messages.interface"
import { createFakeContact } from "App/messages/helpers/create-fake-contact"
import Mock = jest.Mock
import getThreads from "Renderer/requests/get-threads.request"
import getMessagesByThreadId from "Renderer/requests/get-messages-by-thread-id.request"
import selectPlugin from "@rematch/select"

jest.mock("Renderer/requests/get-threads.request", () =>
  jest.fn(() => ({ data: [{ id: "1" }, { id: "2" }] }))
)

jest.mock("Renderer/requests/get-messages-by-thread-id.request", () =>
  jest.fn((threadId: string) => ({
    data: [
      { id: "1", threadId: "1" },
      {
        id: "2",
        threadId: "2",
      },
    ].filter((message) => message.threadId === threadId),
  }))
)

const contact = createFakeContact()

const mockThread: Thread = {
  id: contact.primaryPhoneNumber!,
  contactId: contact.id,
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
}

const mockThreads: Thread[] = [
  mockThread,
  {
    id: contact.secondaryPhoneNumber!,
    contactId: contact.id,
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  },
]

const mockMessage: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: contact.primaryPhoneNumber!,
  contactId: contact.id,
  messageType: MessageType.INBOX,
}

const mockMessages: Message[] = [
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
    id: "38a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T12:27:15.256Z"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    threadId: contact.primaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.INBOX,
  },
]

const storeConfig = {
  models: { messages, contacts },
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      messages: messagesInitialState,
      contacts: contactsInitialState,
    },
  },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

afterEach(() => {
  ;(getThreads as any).mockClear()
  ;(getMessagesByThreadId as any).mockClear()
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "contacts": Object {
        "collection": Array [],
        "db": Object {},
        "resultsState": 2,
      },
      "messages": Object {
        "messageIdsInThreadMap": Object {},
        "messageMap": Object {},
        "messagesResultStateMap": Object {},
        "resultState": 2,
        "searchValue": "",
        "threadMap": Object {},
        "visibilityFilter": "all",
      },
    }
  `)
})

test("threads are set properly", () => {
  store.dispatch.messages.setThreadMap([mockThread])
  expect(store.getState().messages.threadMap).toStrictEqual({
    [mockThread.id]: mockThread,
  })
})

test("messages are updated properly", () => {
  store.dispatch.messages.setThreadMap([mockThread])
  expect(store.getState().messages.threadMap).toStrictEqual({
    [mockThread.id]: mockThread,
  })

  store.dispatch.messages.updateMessages([mockMessage])
  expect(store.getState().messages.messageMap).toStrictEqual({
    [mockMessage.id]: mockMessage,
  })

  expect(store.getState().messages.messageIdsInThreadMap).toStrictEqual({
    [mockThread.id]: [mockMessage.id],
  })
})

test("threads and messages are cleared properly", () => {
  store.dispatch.messages.setThreadMap([mockThread])
  expect(Object.keys(store.getState().messages.threadMap)).toHaveLength(1)

  store.dispatch.messages.updateMessages([mockMessage])
  expect(Object.keys(store.getState().messages.messageMap)).toHaveLength(1)
  expect(
    Object.keys(store.getState().messages.messageIdsInThreadMap)
  ).toHaveLength(1)

  store.dispatch.messages._devClearAllThreads()
  expect(Object.keys(store.getState().messages.threadMap)).toHaveLength(0)
  expect(Object.keys(store.getState().messages.messageMap)).toHaveLength(0)
  expect(
    Object.keys(store.getState().messages.messageIdsInThreadMap)
  ).toHaveLength(0)
})

test("starts with an empty result state", () => {
  expect(store.getState().messages.resultState).toBe(ResultState.Empty)
})

test("loading threads data sets result state to loaded", async () => {
  await store.dispatch.messages.loadData()
  expect(getThreads).toHaveBeenCalled()
  expect(store.getState().messages.resultState).toBe(ResultState.Loaded)
})

test("threads will only load once when they are already loaded", async () => {
  await Promise.all([
    store.dispatch.messages.loadData(),
    store.dispatch.messages.loadData(),
  ])
  expect(getThreads).toHaveBeenCalledTimes(1)
})

test("loaded data is saved in store properly", async () => {
  await store.dispatch.messages.loadData()
  expect(store.getState().messages.threadMap).toEqual({
    "1": {
      id: "1",
    },
    "2": {
      id: "2",
    },
  })
})

test("sets the result state to error when threads loading fails", async () => {
  ;(getThreads as Mock).mockReturnValue({ error: new Error("failed") })
  await store.dispatch.messages.loadData()
  expect(store.getState().messages.resultState).toBe(ResultState.Error)
})

test("sets the result state to loaded when messages are loaded", async () => {
  await store.dispatch.messages.loadMessagesByThreadId("1")
  expect(getMessagesByThreadId).toHaveBeenCalled()
  expect(store.getState().messages.messagesResultStateMap["1"]).toBe(
    ResultState.Loaded
  )
})

test("messages will only load once when they are already loaded", async () => {
  await Promise.all([
    store.dispatch.messages.loadMessagesByThreadId("1"),
    store.dispatch.messages.loadMessagesByThreadId("1"),
  ])
  expect(getMessagesByThreadId).toHaveBeenCalledTimes(1)
})

test("stores the messages and relation to thread after data is loaded", async () => {
  await store.dispatch.messages.loadMessagesByThreadId("1")
  expect(store.getState().messages.messageMap).toEqual({
    "1": {
      id: "1",
      threadId: "1",
    },
  })
  expect(store.getState().messages.messageIdsInThreadMap).toEqual({
    "1": ["1"],
  })
})

test("sets the error result when loading messages fails", async () => {
  ;(getMessagesByThreadId as Mock).mockReturnValue({
    error: new Error("failed"),
  })
  await store.dispatch.messages.loadMessagesByThreadId("1")
  expect(store.getState().messages.messagesResultStateMap["1"]).toBe(
    ResultState.Error
  )
})

test("visibility filter changes correctly", () => {
  const desiredVisibilityFilter = VisibilityFilter.All
  store.dispatch.messages.changeVisibilityFilter(desiredVisibilityFilter)
  expect(store.getState().messages.visibilityFilter).toBe(
    desiredVisibilityFilter
  )
})

test("search value changes correctly", () => {
  const value = "search"
  store.dispatch.messages.changeSearchValue(value)
  expect(store.getState().messages.searchValue).toBe(value)
})

test("thread is deleted properly", () => {
  store.dispatch.messages.setThreadMap(mockThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const threadId = threadIds[0]
  const beforeDeletingThreadIdsLength = threadIds.length

  store.dispatch.messages.deleteThreads([threadId])

  const afterDeletingThreadIdsLength = Object.keys(
    store.getState().messages.threadMap
  ).length
  expect(afterDeletingThreadIdsLength).toEqual(
    beforeDeletingThreadIdsLength - 1
  )
})

test("multiple thread are deleted properly", () => {
  store.dispatch.messages.setThreadMap(mockThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const toDeleteThreadIds = [threadIds[0], threadIds[1]]
  const beforeDeletingThreadIdsLength = threadIds.length

  store.dispatch.messages.updateMessages([mockMessage])
  const messageIds = Object.keys(store.getState().messages.messageMap)
  const beforeDeletingMessageIdsLength = messageIds.length

  store.dispatch.messages.deleteThreads(toDeleteThreadIds)

  const afterDeletingThreadIdsLength = Object.keys(
    store.getState().messages.threadMap
  ).length
  expect(afterDeletingThreadIdsLength).toEqual(
    beforeDeletingThreadIdsLength - toDeleteThreadIds.length
  )
  const afterDeletingMessageIdsLength = Object.keys(
    store.getState().messages.messageMap
  ).length
  expect(afterDeletingMessageIdsLength).toEqual(
    beforeDeletingMessageIdsLength - 1
  )
})

test("marks thread as read", () => {
  store.dispatch.messages.setThreadMap(mockThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const toMakeReadThreadIds = [threadIds[0], threadIds[1]]

  store.dispatch.messages.markAsRead(toMakeReadThreadIds)

  expect(store.getState().messages.threadMap[threadIds[0]].unread).toBeFalsy()
  expect(store.getState().messages.threadMap[threadIds[1]].unread).toBeFalsy()
})

test("thread read status is toggled properly?", () => {
  store.dispatch.messages.setThreadMap(mockThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const toToggleThreadIds = [threadIds[0], threadIds[1]]

  store.dispatch.messages.toggleReadStatus(toToggleThreadIds)

  expect(store.getState().messages.threadMap[threadIds[0]].unread).toBeFalsy()
  expect(store.getState().messages.threadMap[threadIds[1]].unread).toBeFalsy()
})

test("search value selector return value properly", () => {
  const value = "search"
  store.dispatch.messages.changeSearchValue(value)

  const searchValue = store.select.messages.searchValue(store.getState())
  expect(searchValue).toBe(value)
})

test("visibility filter selector return value properly", () => {
  const desiredVisibilityFilter = VisibilityFilter.All
  store.dispatch.messages.changeVisibilityFilter(desiredVisibilityFilter)

  const visibilityFilter = store.select.messages.visibilityFilter(
    store.getState()
  )
  expect(visibilityFilter).toBe(desiredVisibilityFilter)
})

test("threads selector return value properly", () => {
  store.dispatch.messages.setThreadMap([mockThread])

  const threads = store.select.messages.threads(store.getState())
  expect(threads).toStrictEqual([mockThread])
})

test("filtered threads selector return value properly", () => {
  store.dispatch.messages.setThreadMap(mockThreads)
  store.dispatch.messages.changeSearchValue(contact.primaryPhoneNumber)

  const filteredThreads = store.select.messages.filteredThreads(
    store.getState()
  )
  expect(filteredThreads).toStrictEqual([mockThread])

  store.dispatch.messages.changeSearchValue("you will not find me")

  const emptyList = store.select.messages.filteredThreads(store.getState())
  expect(emptyList).toHaveLength(0)
})

test("get messages result map state by thread id selector return value properly", async () => {
  store.dispatch.messages.setThreadMap(mockThreads)

  const getMessagesResultMapStateByThreadId = store.select.messages.getMessagesResultMapStateByThreadId(
    store.getState()
  )
  expect(getMessagesResultMapStateByThreadId("1")).toBe(ResultState.Empty)
})

test("get messages by thread id selector return value properly", () => {
  store.dispatch.messages.setThreadMap([mockThread])
  store.dispatch.messages.updateMessages([mockMessage])

  const getMessagesByThreadId = store.select.messages.getMessagesByThreadId(
    store.getState()
  )
  expect(getMessagesByThreadId(mockThread.id)).toStrictEqual([mockMessage])
})

test("is thread opened selector return value properly", () => {
  store.dispatch.messages.setThreadMap([mockThread])
  store.dispatch.messages.updateMessages([mockMessage])

  const isThreadOpened = store.select.messages.isThreadOpened(store.getState())
  expect(isThreadOpened(contact.secondaryPhoneNumber)).toStrictEqual(true)
  expect(isThreadOpened(contact.primaryPhoneNumber)).toStrictEqual(false)
})

test("clear the previous state for thread messages", () => {
  store.dispatch.messages.updateMessages(mockMessages)
  expect(Object.keys(store.getState().messages.messageMap)).toHaveLength(2)
  expect(
    store.getState().messages.messageIdsInThreadMap[contact.primaryPhoneNumber!]
  ).toHaveLength(2)
  //open messages after deleting one message on Pure
  store.dispatch.messages.updateMessages([mockMessage])
  expect(Object.keys(store.getState().messages.messageMap)).toHaveLength(1)
  expect(
    store.getState().messages.messageIdsInThreadMap[contact.primaryPhoneNumber!]
  ).toHaveLength(1)
})
