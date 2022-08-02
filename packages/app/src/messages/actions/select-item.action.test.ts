/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import createMockStore from "redux-mock-store"
import {
  selectAllItems,
  resetItems,
  toggleItem,
} from "App/messages/actions/select-item.action"
import { MessagesEvent, MessageType } from "App/messages/constants"
import { Thread } from "App/messages/dto"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Select items actions", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
    messageType: MessageType.INBOX,
  }
  const secondThread: Thread = {
    id: "2",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
    messageType: MessageType.INBOX,
  }
  test("Action: `ResetItems` - fire action without payload and `ResetItems` type", () => {
    mockStore.dispatch(resetItems())
    expect(mockStore.getActions()).toEqual([
      {
        type: MessagesEvent.ResetItems,
        payload: undefined,
      },
    ])
  })

  test("Action: `ToggleItem` - fire action with thread id and `ToggleItem` type", async () => {
    const mockStore = createMockStore([thunk])({
      messages: {
        threadMap: {
          [thread.id]: thread,
          [secondThread.id]: secondThread,
        },
        selectedItems: { rows: [] },
      },
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(toggleItem(thread.id) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      toggleItem.pending(requestId, thread.id),
      toggleItem.fulfilled([thread.id], requestId, thread.id),
    ])
  })

  test("Action `selectAllItems` returns list of thread ids", async () => {
    const mockStore = createMockStore([thunk])({
      messages: {
        threadMap: {
          [thread.id]: thread,
          [secondThread.id]: secondThread,
        },
      },
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(selectAllItems() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      selectAllItems.pending(requestId),
      selectAllItems.fulfilled([thread.id, secondThread.id], requestId),
    ])
  })
})
