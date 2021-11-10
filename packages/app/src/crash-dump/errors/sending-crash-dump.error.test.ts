/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SendingCrashDumpError } from "App/crash-dump/errors/sending-crash-dump.error"
import { CrashDumpError } from "App/crash-dump/constants"

const subject = new SendingCrashDumpError("Subject error", {
  error: "Error description",
})

test("SendingCrashDumpError have CrashDumpError.Sending type", () => {
  expect(subject.type).toEqual(CrashDumpError.Sending)
})

test("SendingCrashDumpError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("SendingCrashDumpError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
