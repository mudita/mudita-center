/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getDeletedThreadText } from "App/messages/helpers/get-deleted-thread-text"

describe("`getDeletedThreadText`", () => {
  test("when only one thread was deleted", () => {
    expect(getDeletedThreadText(1)).toEqual({
      id: "module.messages.deletedThread",
    })
  })
  test("when more than one thread were deleted", () => {
    expect(getDeletedThreadText(2)).toEqual({
      id: "module.messages.deletedThreads",
      values: { number: 2 },
    })
  })
})
