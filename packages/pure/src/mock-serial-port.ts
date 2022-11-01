/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort = require("serialport")
import { ProductID, VendorID, Manufacture } from "./device/constants/index.js"
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MockBinding = require("@serialport/binding-mock")

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function mockSerialPort() {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  SerialPort.Binding = MockBinding
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  MockBinding.createPort("/dev/ROBOT", {
    productId: ProductID.MuditaPure,
    vendorId: VendorID.MuditaPure,
    manufacturer: Manufacture.Mudita,
    echo: true,
    record: true,
    // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
  })
}
