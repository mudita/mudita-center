/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CreateTemplateError } from "./create-template.error"
import { TemplateError } from "App/templates/constants"

const subject = new CreateTemplateError("Subject error", {
  error: "Error description",
})

test("CreateTemplateError have TemplateError.CreateTemplate type", () => {
  expect(subject.type).toEqual(TemplateError.CreateTemplate)
})

test("CreateTemplateError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("CreateTemplateError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
