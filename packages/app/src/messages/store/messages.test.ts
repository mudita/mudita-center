/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import messages from "App/messages/store/messages"
import selectPlugin from "@rematch/select"
import { messagesData } from "App/seeds/messages"
import { mockedUnreadThreads } from "App/__mocks__/mocked-unread-threads"
import { VisibilityFilter } from "App/messages/store/messages.interface"

const storeConfig = {
  models: { messages },
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      messages: {
        threads: [...mockedUnreadThreads, messagesData],
      },
    },
  },
}

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

test("deletes one of the conversations", () => {
  const messagesIdsToDelete = store.getState().messages.threads[0].id
  const initialConversationsAmount = store.getState().messages.threads.length
  store.dispatch.messages.deleteConversation([messagesIdsToDelete])
  const conversationAmountAfterDeleting = store.getState().messages.threads
    .length
  expect(conversationAmountAfterDeleting).toEqual(
    initialConversationsAmount - 1
  )
})

test("deletes multiple conversations", () => {
  const initialConversations = store.getState().messages.threads
  const messagesIdsToDelete = [
    initialConversations[0].id,
    initialConversations[1].id,
  ]
  const initialConversationsAmount = initialConversations.length
  store.dispatch.messages.deleteConversation(messagesIdsToDelete)
  const conversationAmountAfterDeleting = store.getState().messages.threads
    .length
  expect(conversationAmountAfterDeleting).toEqual(
    initialConversationsAmount - messagesIdsToDelete.length
  )
})

test("marks messages as read", () => {
  const messagesIdsToMakeRead = [
    mockedUnreadThreads[0].id,
    mockedUnreadThreads[1].id,
  ]
  store.dispatch.messages.markAsRead(messagesIdsToMakeRead)
  expect(store.getState().messages.threads[0].unread).toBeFalsy()
  expect(store.getState().messages.threads[1].unread).toBeFalsy()
})
