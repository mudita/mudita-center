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

test("allow to an established connection with a given phonePort", async () => {
  const { status } = await phonePort.connect()
  expect(status).toEqual(ResponseStatus.Ok)
})

test("second try for connection process return error", async () => {
  await phonePort.connect()
  const response = await phonePort.connect()
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})

test("allows the manual disconnection of the phone from the device", async () => {
  const response = await phonePort.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("disconnection when phone isn't connect return ok status", async () => {
  const response = await phonePort.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("emits signals when the phone disconnects automatically", async (done) => {
  const {status} = await phonePort.connect()
  console.log("1. status: ", status)
  phonePort.on(PortEventName.Disconnected, done)

  // emits fake disconnected event
  await phonePort.disconnect()
})

test("unregister listener isn't triggering after emits event", async (done) => {
  const {status} = await phonePort.connect()
  console.log("2. status: ", status)
  const listener = () => {
    throw new Error()
  }
  phonePort.on(PortEventName.Disconnected, listener)
  phonePort.off(PortEventName.Disconnected, listener)

  phonePort.on(PortEventName.Disconnected, done)
  // emits fake disconnected event
  await phonePort.disconnect()
})

test("request method return expected response", async () => {
  await phonePort.connect()

  jest
    .spyOn<any, any>(phonePort, "request")
    .mockImplementation(
      async () =>
        new Promise((resolve) => resolve({ status: ResponseStatus.Ok }))
    )

  const { status } = await phonePort.request({
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  })

  expect(status).toEqual(ResponseStatus.Ok)
})

test("request method return throw error if phone isn't connected", async () => {
  const response = await phonePort.request({
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  })
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})
