import { init } from "@rematch/core"
import messages from "Renderer/models/messages/messages"
import { VisibilityFilter } from "Renderer/models/messages/messages.interface"
import selectPlugin from "@rematch/select"
import { messagesSeed } from "App/seeds/messages"

const storeConfig = {
  models: { messages },
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      messages: messagesSeed,
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
