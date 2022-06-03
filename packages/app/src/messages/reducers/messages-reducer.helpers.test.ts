/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { markThreadsReadStatus } from "App/messages/reducers/messages-reducer.helpers"
import { Thread } from "App/messages/reducers/messages.interface"

const thread: Thread = {
  id: "1",
  phoneNumber: "+48 755 853 216",
  lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
  messageSnippet:
    "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
  unread: true,
}

describe("Messages Reducer - helpers", () => {
  test("when both `threadMap` and `threads` are empty, the empty object is returned", () => {
    const result = markThreadsReadStatus([], {})
    expect(result).toEqual({})
  })

  test("when is empty `threadMap` and `threads` array is filled with some threads, the empty object is returned", () => {
    const result = markThreadsReadStatus([thread], {})
    expect(result).toEqual({})
  })

  test("when `threadMap` is filed with the thread and `threads` array is empty, the return result is equal to `threadMap`", () => {
    const threadMap = { ["1"]: thread }
    const result = markThreadsReadStatus([], threadMap)
    expect(result).toEqual(threadMap)
  })

  test("when `threadMap` both `threads` are filled with the same thread, the modified threadMap is returned", () => {
    const result = markThreadsReadStatus([thread], { ["1"]: thread })
    expect(result).toEqual({ ["1"]: { ...thread, unread: false } })
  })
})
