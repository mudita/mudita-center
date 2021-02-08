import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import { manufacturer, productId } from "./index"

export default function mockSerialPort() {
  SerialPort.Binding = MockBinding
  MockBinding.createPort("/dev/ROBOT", {
    productId,
    manufacturer,
    echo: true,
    record: true,
    // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
  })
}
