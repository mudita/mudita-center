/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { initialState, messagesReducer, Thread, VisibilityFilter } from "App/messages/reducers"
import { filteredThreadsSelector } from "App/messages/selectors/filtered-threads.selector"
import { initialState as contactsInitialState } from "App/contacts/reducers"

describe("`filteredThreadsSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
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
    }

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          visibilityFilter: VisibilityFilter.Unread,
          threadMap: {
            [thread.id]: thread,
          },
        },
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
    }

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          searchValue: "755",
          threadMap: {
            [thread.id]: thread,
          },
        },
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(filteredThreadsSelector(state)).toEqual([thread])
  })
})
