import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import PureNode from "./index"

SerialPort.Binding = MockBinding
MockBinding.createPort("/dev/ROBOT", {
  echo: true,
  record: true,
})

test("allow a listing of all visible Pure phones", async () => {
  const [phones] = await PureNode.getPhones()
  expect(phones?.id).toEqual(1)
})
