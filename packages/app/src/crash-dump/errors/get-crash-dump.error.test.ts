/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GetCrashDumpError } from "App/crash-dump/errors/get-crash-dump.error"
import { CrashDumpError } from "App/crash-dump/constants"

const subject = new GetCrashDumpError("Subject error", {
  error: "Error description",
})

test("GetCrashDumpError have CrashDumpError.Getting type", () => {
  expect(subject.type).toEqual(CrashDumpError.Getting)
})

test("GetCrashDumpError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("GetCrashDumpError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
