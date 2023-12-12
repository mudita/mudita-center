/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { initialState, messagesReducer } from "Core/messages/reducers"
import { Thread } from "Core/messages/dto"
import { MessageType } from "Core/messages/constants"
import { threadsSelector } from "Core/messages/selectors/threads.selector"

describe("`threadsSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(threadsSelector(state)).toEqual([])
  })

  test("when threadMap contains some records selector returns value properly", () => {
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
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(threadsSelector(state)).toEqual([thread])
  })
})
