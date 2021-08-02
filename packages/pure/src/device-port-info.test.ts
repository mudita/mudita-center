/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DevicePortInfo from "./device-port-info"

test("isVendorId function works properly", () => {
  expect(DevicePortInfo.isVendorId({vendorId: "3310"})).toBeTruthy()
  expect(DevicePortInfo.isVendorId({vendorId: undefined})).toBeFalsy()
  expect(DevicePortInfo.isVendorId({})).toBeFalsy()
})

test("isProductId function works properly", () => {
  expect(DevicePortInfo.isProductId({productId: "0100"})).toBeTruthy()
  expect(DevicePortInfo.isProductId({productId: undefined})).toBeFalsy()
  expect(DevicePortInfo.isProductId({})).toBeFalsy()
})

test("isPortInfoMatch function works properly", () => {
  expect(DevicePortInfo.isPortInfoMatch({vendorId: "3310", productId: "0100"})).toBeTruthy()
  expect(DevicePortInfo.isPortInfoMatch({vendorId: "3310"})).toBeFalsy()
  expect(DevicePortInfo.isPortInfoMatch({productId: "0100"})).toBeFalsy()
  expect(DevicePortInfo.isPortInfoMatch({})).toBeFalsy()
})
