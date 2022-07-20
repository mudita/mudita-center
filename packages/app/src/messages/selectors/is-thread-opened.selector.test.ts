/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { initialState, messagesReducer } from "App/messages/reducers"
import { Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { isThreadOpenedSelector } from "App/messages/selectors/is-thread-opened.selector"

describe("`isThreadOpenedSelector` selector", () => {
  test("when initial state is set selector returns false value", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(isThreadOpenedSelector("500500500")(state)).toBeFalsy()
  })

  test("when threadMap no contains searched phoneNumber selector returns false", () => {
    const thread: Thread = {
      id: "1",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
      messageType: MessageType.INBOX,
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
    } as ReduxRootState
    expect(isThreadOpenedSelector("500500500")(state)).toBeFalsy()
  })

  test("when threadMap contains searched phoneNumber selector returns true", () => {
    const thread: Thread = {
      id: "1",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
      messageType: MessageType.INBOX,
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
    } as ReduxRootState
    expect(isThreadOpenedSelector("+48 755 853 216")(state)).toBeTruthy()
  })
})
