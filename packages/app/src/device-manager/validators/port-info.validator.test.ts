/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfoValidator } from "./port-info.validator"

test("isVendorId function works properly", () => {
  expect(PortInfoValidator.isVendorIdValid({ vendorId: "3310" })).toBeTruthy()
  expect(PortInfoValidator.isVendorIdValid({ vendorId: undefined })).toBeFalsy()
  expect(PortInfoValidator.isVendorIdValid({})).toBeFalsy()
})

test("isProductId function works properly", () => {
  expect(PortInfoValidator.isProductIdValid({ productId: "0100" })).toBeTruthy()
  expect(
    PortInfoValidator.isProductIdValid({ productId: undefined })
  ).toBeFalsy()
  expect(PortInfoValidator.isProductIdValid({})).toBeFalsy()
})

test("isPortInfoMatch function works properly", () => {
  expect(
    PortInfoValidator.isPortInfoMatch({ vendorId: "3310", productId: "0100" })
  ).toBeTruthy()
  expect(PortInfoValidator.isPortInfoMatch({ vendorId: "3310" })).toBeFalsy()
  expect(PortInfoValidator.isPortInfoMatch({ productId: "0100" })).toBeFalsy()
  expect(PortInfoValidator.isPortInfoMatch({})).toBeFalsy()
})
