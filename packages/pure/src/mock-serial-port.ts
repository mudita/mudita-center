/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort = require("serialport")
import DevicePortInfo from "./device-port-info"
const MockBinding = require("@serialport/binding-mock")

export default function mockSerialPort() {
  SerialPort.Binding = MockBinding
  MockBinding.createPort("/dev/ROBOT", {
    productId: DevicePortInfo.productId,
    vendorId: DevicePortInfo.vendorId,
    manufacturer: DevicePortInfo.manufacturer,
    echo: true,
    record: true,
    // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
  })
}
