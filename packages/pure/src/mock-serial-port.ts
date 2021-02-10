import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import { vendorId, manufacturer, productId } from "./index"

export default function mockSerialPort() {
  SerialPort.Binding = MockBinding
  MockBinding.createPort("/dev/ROBOT", {
    productId,
    vendorId,
    manufacturer,
    echo: true,
    record: true,
    // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
  })
}
