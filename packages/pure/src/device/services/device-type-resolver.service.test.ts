/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceTypeResolverService } from "./device-type-resolver.service"
import { ProductID, MuditaDeviceType } from "../constants"

const subject = new DeviceTypeResolverService()

test("resolve method return Mudita Pure device", () => {
  expect(
    subject.resolve({ productId: ProductID.MuditaPure })?.deviceType
  ).toEqual(MuditaDeviceType.MuditaPure)
  expect(
    subject.resolve({ productId: ProductID.MuditaPureTemporary })?.deviceType
  ).toEqual(MuditaDeviceType.MuditaPure)
})

test("resolve method return Mudita Harmony device", () => {
  expect(
    subject.resolve({ productId: ProductID.MuditaHarmony })?.deviceType
  ).toEqual(MuditaDeviceType.MuditaHarmony)
  expect(
    subject.resolve({ productId: ProductID.MuditaHarmonyTemporary })?.deviceType
  ).toEqual(MuditaDeviceType.MuditaHarmony)
})

test("resolve method return undefine for unknown product id", () => {
  expect(subject.resolve({ productId: "Nokia 3301" })?.deviceType).toEqual(
    undefined
  )
})
