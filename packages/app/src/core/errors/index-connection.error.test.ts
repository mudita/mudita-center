/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexConnectionError } from "./index-connection.error"
import { ModelError } from "App/core/constants"

const subject = new IndexConnectionError("Subject error", {
  error: "Error description",
})

test("IndexConnectionError have ModelError.IndexConnection type", () => {
  expect(subject.type).toEqual(ModelError.IndexConnection)
})

test("IndexConnectionError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("IndexConnectionError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
