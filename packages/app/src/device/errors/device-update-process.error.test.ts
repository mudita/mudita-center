/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceUpdateProcessError } from "./device-update-process.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceUpdateProcessError("Subject error", {
  error: "Error description",
})

test("DeviceUpdateProcessError have DeviceError.UpdateProcess type", () => {
  expect(subject.type).toEqual(DeviceError.UpdateProcess)
})

test("DeviceUpdateProcessError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceUpdateProcessError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
