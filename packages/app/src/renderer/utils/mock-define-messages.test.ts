/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { mockDefineMessages } from "Renderer/utils/mock-define-messages"

test("returns default message ", () => {
  const defaultMessage = {
    id: "view.name.news",
  }
  expect(mockDefineMessages()).toMatchObject(defaultMessage)
})

test("returns object with id provided", () => {
  const customId = "view.name.phone"
  const customMessage = {
    id: customId,
  }
  expect(mockDefineMessages(customId)).toMatchObject(customMessage)
})
