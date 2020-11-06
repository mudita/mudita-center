import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import PureNode, { productId, manufacturer } from "./index"
import { createPhonePort } from "./phone-port"
import { ConnectResponseStatus } from "./types"

SerialPort.Binding = MockBinding
MockBinding.createPort("/dev/ROBOT", {
  productId,
  manufacturer,
  echo: true,
  record: true,
  // serialNumber: 1 <- is default implementation by MockBinding as serialNumber incrementing
})

let pureNode: PureNode

beforeEach(async () => {
  pureNode = new PureNode(createPhonePort)
})

test("allow a listing of all visible Pure phones", async () => {
  const [phones] = await PureNode.getPhones()
  expect(phones?.id).toEqual(1)
})

test("allow to an established connection with a given telephone using the unique device identifier", async () => {
  const [{ id }] = await PureNode.getPhones()
  const response = await pureNode.connect(id)
  expect(response.status).toEqual(ConnectResponseStatus.Ok)
})
