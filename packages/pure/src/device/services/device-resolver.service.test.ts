/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceResolverService } from "./device-resolver.service"
import { ProductID, DeviceType } from "../constants"

const subject = new DeviceResolverService()

test("resolve method return Mudita Pure device", async () => {
  const MuditaPureResult = await subject.resolve({
    productId: ProductID.MuditaPure,
    path: "/path/123",
  })
  expect(MuditaPureResult?.deviceType).toEqual(DeviceType.MuditaPure)
  const MuditaPureTemporaryResult = await subject.resolve({
    productId: ProductID.MuditaPureTemporary,
    path: "/path/123",
  })
  expect(MuditaPureTemporaryResult?.deviceType).toEqual(DeviceType.MuditaPure)
})

test("resolve method return Mudita Harmony device", async () => {
  const result = await subject.resolve({
    productId: ProductID.MuditaHarmony,
    path: "/path/123",
  })
  expect(result?.deviceType).toEqual(DeviceType.MuditaHarmony)
})

test("resolve method return undefine for unknown product id", async () => {
  const result = await subject.resolve({
    productId: "Nokia 3310",
    path: "/path/123",
  })

  expect(result?.deviceType).toEqual(undefined)
})
