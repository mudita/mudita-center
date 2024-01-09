/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProductID, DeviceType } from "Core/device/constants"
import { DeviceResolverService } from "Core/device-manager/services/device-resolver.service"

const subject = new DeviceResolverService()

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

//TODO: temporary, remove in future
describe.skip("Unknown descriptor", () => {
  test("returns undefined if unknown product id has been provided", () => {
    expect(
      subject.resolve({ productId: "0000", path: "/dev/123" })
    ).toBeUndefined()
  })
})
