/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { EventEmitter } from "events"
import { ProductID, DeviceType } from "App/device/constants"
import { DeviceResolverService } from "App/device-manager/services/device-resolver.service"

const eventEmitter = new EventEmitter()
const subject = new DeviceResolverService(ipcMain, eventEmitter)

describe("Pure descriptor", () => {
  test.each([
    ProductID.MuditaPure,
    ProductID.MuditaPureNotMtpTemporary,
    ProductID.MuditaPureTemporary,
  ])(
    "returns Device with MuditaPure device type if %s productID has been provided",
    (productId) => {
      expect(subject.resolve({ productId }, "/dev/123")?.deviceType).toEqual(
        DeviceType.MuditaPure
      )
    }
  )
})

describe("Harmony descriptor", () => {
  test("returns Device with MuditaPure device type if 0300 productID has been provided", () => {
    expect(
      subject.resolve({ productId: ProductID.MuditaHarmony }, "/dev/123")
        ?.deviceType
    ).toEqual(DeviceType.MuditaHarmony)
  })
})

describe("Unknown descriptor", () => {
  test("returns undefined if unknown product id has been provided", () => {
    expect(subject.resolve({ productId: "0000" }, "/dev/123")).toBeUndefined()
  })
})
