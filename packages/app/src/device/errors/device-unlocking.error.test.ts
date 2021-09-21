/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceUnlockingError } from "./device-unlocking.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceUnlockingError("Subject error", {
  error: "Error description",
})

test("DeviceUnlockingError have DeviceError.Unlocking type", () => {
  expect(subject.type).toEqual(DeviceError.Unlocking)
})

test("DeviceUnlockingError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceUnlockingError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
