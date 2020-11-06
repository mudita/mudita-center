import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import PureNode, { productId, manufacturer } from "./index"

SerialPort.Binding = MockBinding
MockBinding.createPort("/dev/ROBOT", {
  productId,
  manufacturer,
  echo: true,
  record: true,
  // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
})

test("allow a listing of all visible Pure phones", async () => {
  const [phones] = await PureNode.getPhones()
  expect(phones?.id).toEqual(1)
})
