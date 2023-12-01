/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device"
import { FreshdeskTicketProduct } from "./create-freshdesk-ticket.types"
import { mapDeviceTypeToProduct } from "./map-device-type-to-product.helper"

const testCases = [
  {
    deviceType: DeviceType.MuditaPure,
    productCustomField: FreshdeskTicketProduct.Pure,
  },
  {
    deviceType: DeviceType.MuditaHarmony,
    productCustomField: FreshdeskTicketProduct.Harmony,
  },
  {
    deviceType: null,
    productCustomField: FreshdeskTicketProduct.None,
  },
]

describe("mapDeviceTypeToProduct", () => {
  test.each(testCases)(
    `deviceType should be map correctly`,
    ({ deviceType, productCustomField }) => {
      expect(mapDeviceTypeToProduct(deviceType)).toBe(productCustomField)
    }
  )
})
