/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { expect, test } from '@jest/globals';
import { DeviceResolverService } from "./device-resolver.service.js"
import { ProductID, DeviceType } from "../constants/index.js"

const subject = new DeviceResolverService()

test("resolve method return Mudita Pure device", () => {
  expect(
    subject.resolve({ productId: ProductID.MuditaPure }, "/path/123")
      ?.deviceType
  ).toEqual(DeviceType.MuditaPure)
  expect(
    subject.resolve({ productId: ProductID.MuditaPureTemporary }, "/path/123")
      ?.deviceType
  ).toEqual(DeviceType.MuditaPure)
})

test("resolve method return Mudita Harmony device", () => {
  expect(
    subject.resolve({ productId: ProductID.MuditaHarmony }, "/path/123")
      ?.deviceType
  ).toEqual(DeviceType.MuditaHarmony)
})

test("resolve method return undefine for unknown product id", () => {
  expect(
    subject.resolve({ productId: "Nokia 3310" }, "/path/123")?.deviceType
  ).toEqual(undefined)
})
