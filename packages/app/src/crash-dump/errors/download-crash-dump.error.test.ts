/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DownloadCrashDumpError } from "App/crash-dump/errors/download-crash-dump.error"
import { CrashDumpError } from "App/crash-dump/constants"

const subject = new DownloadCrashDumpError("Subject error", {
  error: "Error description",
})

test("DownloadCrashDumpError have CrashDumpError.Downloading type", () => {
  expect(subject.type).toEqual(CrashDumpError.Downloading)
})

test("DownloadCrashDumpError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DownloadCrashDumpError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
