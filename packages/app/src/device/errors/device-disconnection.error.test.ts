/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceDisconnectionError } from "./device-disconnection.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceDisconnectionError("Subject error", {
  error: "Error description",
})

test("DeviceDisconnectionError have DeviceError.Disconnection type", () => {
  expect(subject.type).toEqual(DeviceError.Disconnection)
})

test("DeviceDisconnectionError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceDisconnectionError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
