/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import messages from "Renderer/models/messages/messages"
import { VisibilityFilter } from "Renderer/models/messages/messages.interface"
import selectPlugin from "@rematch/select"
import { messagesData } from "App/seeds/messages"
import { mockedUnreadMessages } from "App/__mocks__/mocked-unread-messages"

const storeConfig = {
  models: { messages },
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      messages: {
        topics: [...mockedUnreadMessages, messagesData],
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
  const messagesIdsToDelete = store.getState().messages.topics[0].id
  const initialConversationsAmount = store.getState().messages.topics.length
  store.dispatch.messages.deleteConversation([messagesIdsToDelete])
  const conversationAmountAfterDeleting = store.getState().messages.topics
    .length
  expect(conversationAmountAfterDeleting).toEqual(
    initialConversationsAmount - 1
  )
})

test("deletes multiple conversations", () => {
  const initialConversations = store.getState().messages.topics
  const messagesIdsToDelete = [
    initialConversations[0].id,
    initialConversations[1].id,
  ]
  const initialConversationsAmount = initialConversations.length
  store.dispatch.messages.deleteConversation(messagesIdsToDelete)
  const conversationAmountAfterDeleting = store.getState().messages.topics
    .length
  expect(conversationAmountAfterDeleting).toEqual(
    initialConversationsAmount - messagesIdsToDelete.length
  )
})

test("marks messages as read", () => {
  const messagesIdsToMakeRead = [
    mockedUnreadMessages[0].id,
    mockedUnreadMessages[1].id,
  ]
  store.dispatch.messages.markAsRead(messagesIdsToMakeRead)
  expect(store.getState().messages.topics[0].unread).toBeFalsy()
  expect(store.getState().messages.topics[1].unread).toBeFalsy()
})
