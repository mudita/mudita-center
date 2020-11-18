import mockSerialPort from "./mock-serial-port"
import PureNode from "./index"
import PhonePort from "./phone-port"
import {
  Endpoint,
  PortEventName,
  Method,
  ResponseStatus,
} from "./phone-port.types"

let phonePort: PhonePort

beforeEach(async (done) => {
  mockSerialPort()

  const phonePorts = await PureNode.getPhonePorts()
  phonePort = phonePorts[0]
  done()
})

test("allow to establish a connection with a given port", async () => {
  const { status } = await phonePort.connect()
  expect(status).toEqual(ResponseStatus.Ok)
})

test("second try for connection process return error", async () => {
  await phonePort.connect()
  const response = await phonePort.connect()
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})

test("allows to programmatically disconnect the device", async () => {
  const response = await phonePort.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("disconnecting not connected device returns OK status", async () => {
  const response = await phonePort.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("emits a signal when the phone disconnects automatically", async (done) => {
  await phonePort.connect()
  phonePort.on(PortEventName.Disconnected, done)

  // emits fake disconnected event
  await phonePort.disconnect()
})

test("unregister listener isn't triggering after emits event", async (done) => {
  await phonePort.connect()
  const listener = () => {
    throw new Error()
  }
  phonePort.on(PortEventName.Disconnected, listener)
  phonePort.off(PortEventName.Disconnected, listener)

  phonePort.on(PortEventName.Disconnected, done)
  // emits fake disconnected event
  await phonePort.disconnect()
})

test("request method return error if phone isn't connected", async () => {
  const response = await phonePort.request({
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  })
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})
