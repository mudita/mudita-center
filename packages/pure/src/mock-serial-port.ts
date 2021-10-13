/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort = require("serialport")
import { ProductID, VendorID, Manufacture } from "./device"
const MockBinding = require("@serialport/binding-mock")

export default function mockSerialPort() {
  SerialPort.Binding = MockBinding
  MockBinding.createPort("/dev/ROBOT", {
    productId: ProductID.MuditaPure,
    vendorId: VendorID.MuditaPure,
    manufacturer: Manufacture.Mudita,
    echo: true,
    record: true,
    // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
  })
}
