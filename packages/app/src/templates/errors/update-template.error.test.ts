/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UpdateTemplateError } from "./update-template.error"
import { TemplateError } from "App/templates/constants"

const subject = new UpdateTemplateError("Subject error", {
  error: "Error description",
})

test("UpdateTemplateError have TemplateError.UpdateTemplate type", () => {
  expect(subject.type).toEqual(TemplateError.UpdateTemplate)
})

test("UpdateTemplateError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("UpdateTemplateError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
