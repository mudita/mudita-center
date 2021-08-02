import DevicePortInfo from "./default-device-port-info"

test("isVendorId function works properly", () => {
  expect(DevicePortInfo.isVendorId({vendorId: "045e"})).toBeTruthy()
  expect(DevicePortInfo.isVendorId({vendorId: "045E"})).toBeTruthy()
  expect(DevicePortInfo.isVendorId({vendorId: undefined})).toBeFalsy()
  expect(DevicePortInfo.isVendorId({})).toBeFalsy()
})

test("isProductId function works properly", () => {
  expect(DevicePortInfo.isProductId({productId: "0622"})).toBeTruthy()
  expect(DevicePortInfo.isProductId({productId: undefined})).toBeFalsy()
  expect(DevicePortInfo.isProductId({})).toBeFalsy()
})

test("isPortInfoMatch function works properly", () => {
  expect(DevicePortInfo.isPortInfoMatch({vendorId: "045e", productId: "0622"})).toBeTruthy()
  expect(DevicePortInfo.isPortInfoMatch({vendorId: "045e"})).toBeFalsy()
  expect(DevicePortInfo.isPortInfoMatch({productId: "0622"})).toBeFalsy()
  expect(DevicePortInfo.isPortInfoMatch({})).toBeFalsy()
})
