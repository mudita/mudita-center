/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceFileRemovingError } from "./device-file-removing.error"
import { DeviceFileSystemError } from "App/device-file-system/constants"

const subject = new DeviceFileRemovingError("Subject error", {
  error: "Error description",
})

test("DeviceFileRemovingError have DeviceFileSystemError.Removing type", () => {
  expect(subject.type).toEqual(DeviceFileSystemError.Removing)
})

test("DeviceFileRemovingError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceFileRemovingError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
