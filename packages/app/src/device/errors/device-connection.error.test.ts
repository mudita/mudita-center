/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceConnectionError } from "./device-connection.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceConnectionError("Subject error", {
  error: "Error description",
})

test("DeviceConnectionError have DeviceError.Connection type", () => {
  expect(subject.type).toEqual(DeviceError.Connection)
})

test("DeviceConnectionError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceConnectionError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
