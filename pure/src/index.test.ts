import SerialPort = require("serialport")
const MockBinding = require("@serialport/binding-mock")
import PureNode, { productId, manufacturer } from "./index"
import { EventName, ResponseStatus } from "./types"

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
  pureNode = new PureNode()
})

test("allow a listing of all visible Pure phones", async () => {
  const [phones] = await PureNode.getPhones()
  expect(phones?.id).toEqual(1)
})

test("allow to an established connection with a given telephone using the unique device identifier", async () => {
  const [{ id }] = await PureNode.getPhones()
  const response = await pureNode.connect(id)
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("second try for connection process return ok status", async () => {
  const [{ id }] = await PureNode.getPhones()
  await pureNode.connect(id)
  const response = await pureNode.connect(id)
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("allow to the manual disconnection of the phone from the device", async () => {
  const [{ id }] = await PureNode.getPhones()
  await pureNode.connect(id)
  const response = await pureNode.disconnect(id)
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("disconnection when phone isn't connect return ok status", async () => {
  const [{ id }] = await PureNode.getPhones()
  const response = await pureNode.disconnect(id)
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("emits signals when the phone disconnects automatically", async (done) => {
  const [{ id }] = await PureNode.getPhones()
  await pureNode.connect(id)
  pureNode.on(id, EventName.Disconnected, done)

  // emits fake disconnected event
  await pureNode.disconnect(id)
})

test("unregister listener isn't trigger after emits event", async (done) => {
  const [{ id }] = await PureNode.getPhones()
  await pureNode.connect(id)
  const listener = () => {
    throw new Error()
  }
  pureNode.on(id, EventName.Disconnected, listener)
  pureNode.off(id, EventName.Disconnected, listener)

  pureNode.on(id, EventName.Disconnected, done)
  // emits fake disconnected event
  await pureNode.disconnect(id)
})
