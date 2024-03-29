/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Core/__deprecated__/renderer/store"
import { initialState, messagesReducer } from "Core/messages/reducers"
import { Thread } from "Core/messages/dto"
import { filteredThreadsSelector } from "Core/messages/selectors/filtered-threads.selector"
import { initialState as contactsInitialState } from "Core/contacts/reducers"
import { MessageType, VisibilityFilter } from "Core/messages/constants"

describe("`filteredThreadsSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messagesReducer(initialState, {} as any),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(filteredThreadsSelector(state)).toEqual([])
  })

  test("when visibilityFilter is set to `Unread` selector filtered list", () => {
    const thread: Thread = {
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

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            visibilityFilter: VisibilityFilter.Unread,
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(filteredThreadsSelector(state)).toEqual([])
  })

  test("when search value contains some parts of phone number ", () => {
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

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          data: {
            ...initialState.data,
            threadMap: {
              [thread.id]: thread,
            },
            searchValue: "755",
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(filteredThreadsSelector(state)).toEqual([thread])
  })
})
