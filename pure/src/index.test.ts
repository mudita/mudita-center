import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import PureNode, { manufacturer, productId } from "./index"

SerialPort.Binding = MockBinding
MockBinding.createPort("/dev/ROBOT", {
  productId,
  manufacturer,
  echo: true,
  record: true,
  // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
})

test("allow a listing of attached phones", async () => {
  const [phonePort] = await PureNode.getPhonePorts()
  expect(phonePort).not.toBeUndefined()
})
