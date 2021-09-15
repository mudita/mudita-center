/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceChangeSimError } from "./device-change-sim.error"
import { DeviceError } from "App/device/constants"

const subject = new DeviceChangeSimError("Subject error", {
  error: "Error description",
})

test("DeviceChangeSimError have DeviceError.ChangeSim type", () => {
  expect(subject.type).toEqual(DeviceError.ChangeSim)
})

test("DeviceChangeSimError have provided error message", () => {
  expect(subject.message).toEqual("Subject error")
})

test("DeviceChangeSimError have provided payload object", () => {
  expect(subject.payload).toEqual({ error: "Error description" })
})
