/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import messages from "App/messages/store/messages"
import { mockedUnreadThreads } from "App/__mocks__/mocked-unread-threads"
import { VisibilityFilter } from "App/messages/store/messages.interface"

const storeConfig = { models: { messages } }

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

test("visibility filter changes correctly", () => {
  const desiredVisibilityFilter = VisibilityFilter.All
  store.dispatch.messages.changeVisibilityFilter(desiredVisibilityFilter)
  expect(store.getState().messages.visibilityFilter).toBe(
    desiredVisibilityFilter
  )
})

test("deletes one of the thread", () => {
  store.dispatch.messages.updateThreadMap(mockedUnreadThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const threadId = threadIds[0]
  const beforeDeletingThreadLength = threadIds.length

  store.dispatch.messages.deleteThreads([threadId])

  const afterDeletingThreadLength = Object.keys(
    store.getState().messages.threadMap
  ).length
  expect(afterDeletingThreadLength).toEqual(beforeDeletingThreadLength - 1)
})

test("deletes multiple thread", () => {
  store.dispatch.messages.updateThreadMap(mockedUnreadThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const toDeleteThreadIds = [threadIds[0], threadIds[1]]
  const beforeDeletingThreadLength = threadIds.length

  store.dispatch.messages.deleteThreads(toDeleteThreadIds)

  const afterDeletingThreadLength = Object.keys(
    store.getState().messages.threadMap
  ).length
  expect(afterDeletingThreadLength).toEqual(
    beforeDeletingThreadLength - toDeleteThreadIds.length
  )
})

test("marks thread as read", () => {
  store.dispatch.messages.updateThreadMap(mockedUnreadThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const toMakeReadThreadIds = [threadIds[0], threadIds[1]]

  store.dispatch.messages.markAsRead(toMakeReadThreadIds)

  expect(store.getState().messages.threadMap[threadIds[0]].unread).toBeFalsy()
  expect(store.getState().messages.threadMap[threadIds[1]].unread).toBeFalsy()
})

test("toggle thread", () => {
  store.dispatch.messages.updateThreadMap(mockedUnreadThreads)
  const threadIds = Object.keys(store.getState().messages.threadMap)
  const toToggleThreadIds = [threadIds[0], threadIds[1]]

  store.dispatch.messages.markAsRead(toToggleThreadIds)

  expect(store.getState().messages.threadMap[threadIds[0]].unread).toBeFalsy()
  expect(store.getState().messages.threadMap[threadIds[1]].unread).toBeFalsy()
})
