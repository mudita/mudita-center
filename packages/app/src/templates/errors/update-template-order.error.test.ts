/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdateTemplateOrderError } from "./update-template-order.error"
import { TemplateError } from "App/templates/constants"

const subject = new UpdateTemplateOrderError("Subject error", {
  error: "I'm error",
})

describe("UpdateTemplateOrderError", () => {
  test("have TemplateError.UpdateTemplateOrder type", () => {
    expect(subject.type).toEqual(TemplateError.UpdateTemplateOrder)
  })

  test("have provided error message", () => {
    expect(subject.message).toEqual("Subject error")
  })

  test("have provided payload object", () => {
    expect(subject.payload).toEqual({ error: "I'm error" })
  })
})
