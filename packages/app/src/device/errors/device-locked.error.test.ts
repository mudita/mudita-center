/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceLockedError } from "./device-locked.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceLockedError("Subject error", {
  error: "Error description",
})

test("DeviceLockedError have DeviceError.Locked type", () => {
  expect(subject.type).toEqual(DeviceError.Locked)
})

test("DeviceLockedError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceLockedError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
