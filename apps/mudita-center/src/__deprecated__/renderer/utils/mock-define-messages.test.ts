/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mockDefineMessages } from "App/__deprecated__/renderer/utils/mock-define-messages"

test("returns default message ", () => {
  const defaultMessage = {
    id: "module.news",
  }
  expect(mockDefineMessages()).toMatchObject(defaultMessage)
})

test("returns object with id provided", () => {
  const customId = "module.phone"
  const customMessage = {
    id: customId,
  }
  expect(mockDefineMessages(customId)).toMatchObject(customMessage)
})
