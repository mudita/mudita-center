/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceLoadingError } from "./device-loading.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceLoadingError("Subject error", {
  error: "Error description",
})

test("DeviceLoadingError have DeviceError.Loading type", () => {
  expect(subject.type).toEqual(DeviceError.Loading)
})

test("DeviceLoadingError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceLoadingError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
