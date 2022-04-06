/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState, RootState } from "Renderer/store"
import { initialState, messagesReducer, Thread } from "App/messages/reducers"
import { initialState as contactsInitialState } from "App/contacts/reducers"
import { getReceiverSelector } from "App/messages/selectors/get-receiver.selector"

describe("`getReceiverSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(getReceiverSelector("+48 755 853 216")(state)).toBeUndefined()
  })

  test("when messages contains some threads selector returns receiver properly ", () => {
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
          threadMap: {
            [thread.id]: thread,
          },
        },
        {} as any
      ),
      contacts: contactsInitialState,
    } as RootState & ReduxRootState
    expect(getReceiverSelector("+48 755 853 216")(state)).toEqual({
      identification: 0,
      phoneNumber: "+48 755 853 216",
    })
  })
})
