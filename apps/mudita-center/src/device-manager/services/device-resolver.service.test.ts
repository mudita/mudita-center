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
  test.each([ProductID.MuditaPureDeprecated])(
    "returns Device with MuditaPure device type if %s productID has been provided",
    (productId) => {
      expect(
        subject.resolve({ productId, path: "/dev/123" })?.deviceType
      ).toEqual(DeviceType.MuditaPure)
    }
  )
})

describe("Harmony descriptor", () => {
  test("returns Device with MuditaPure device type if 0300 productID has been provided", () => {
    expect(
      subject.resolve({ productId: ProductID.MuditaHarmony, path: "/dev/123" })
        ?.deviceType
    ).toEqual(DeviceType.MuditaHarmony)
  })
})

describe("Kompakt descriptor", () => {
  test("returns Device with MuditaKompakt device type productID has been provided", () => {
    expect(
      subject.resolve({
        productId: ProductID.MuditaKompaktChargeDec,
        path: "/dev/123",
      })?.deviceType
    ).toEqual(DeviceType.MuditaKompakt)
    expect(
      subject.resolve({
        productId: ProductID.MuditaKompaktNoDebugDec,
        path: "/dev/123",
      })?.deviceType
    ).toEqual(DeviceType.MuditaKompakt)
    expect(
      subject.resolve({
        productId: ProductID.MuditaKompaktTransferDec,
        path: "/dev/123",
      })?.deviceType
    ).toEqual(DeviceType.MuditaKompakt)
  })
})

describe("Unknown descriptor", () => {
  test("returns undefined if unknown product id has been provided", () => {
    expect(
      subject.resolve({ productId: "0000", path: "/dev/123" })
    ).toBeUndefined()
  })
})
