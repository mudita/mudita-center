/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import { initialState, messagesReducer } from "Core/messages/reducers"
import { MessageType } from "Core/messages/constants"
import { Thread } from "Core/messages/dto"
import { initialState as contactsInitialState } from "Core/contacts/reducers"
import { getUnreadThreads } from "Core/messages/selectors/get-unread-threads.selector"

describe("`getUnreadThreads` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messagesReducer(initialState, {} as any),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(getUnreadThreads(state)).toHaveLength(0)
  })

  test("returns empty list if the each threads have the `unread` state equals to `false`", () => {
    const threadOne: Thread = {
      id: "1",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: false,
      messageType: MessageType.INBOX,
      contactId: undefined,
      contactName: undefined,
    }

    const threadTwo: Thread = {
      id: "2",
      phoneNumber: "+48 216 755 853",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: false,
      messageType: MessageType.INBOX,
      contactId: undefined,
      contactName: undefined,
    }

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [threadOne.id]: threadOne,
              [threadTwo.id]: threadTwo,
            },
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState

    expect(getUnreadThreads(state)).toHaveLength(0)
  })

  test("returns the threads list if one of the thread have `unread` state equal to `true`", () => {
    const threadOne: Thread = {
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

    const threadTwo: Thread = {
      id: "2",
      phoneNumber: "+48 216 755 853",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: false,
      messageType: MessageType.INBOX,
      contactId: undefined,
      contactName: undefined,
    }

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [threadOne.id]: threadOne,
              [threadTwo.id]: threadTwo,
            },
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState

    expect(getUnreadThreads(state)).toEqual([threadOne])
  })
})
