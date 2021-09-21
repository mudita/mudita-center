/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceInvalidPhoneLockTimeError } from "./device-invalid-phone-lock-time.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceInvalidPhoneLockTimeError("Subject error", {
  error: "Error description",
})

test("DeviceInvalidPhoneLockTimeError have DeviceError.InvalidPhoneLockTime type", () => {
  expect(subject.type).toEqual(DeviceError.InvalidPhoneLockTime)
})

test("DeviceInvalidPhoneLockTimeError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceInvalidPhoneLockTimeError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
