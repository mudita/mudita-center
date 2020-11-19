import mockSerialPort from "./mock-serial-port"
import PureNode from "./index"
import Device from "./device"
import {
  Endpoint,
  DeviceEventName,
  Method,
  ResponseStatus,
} from "./device.types"

let device: Device

beforeEach(async (done) => {
  mockSerialPort()

  const devices = await PureNode.getDevices()
  device = devices[0]
  done()
})

test("allow to establish a connection with a given device", async () => {
  const { status } = await device.connect()
  expect(status).toEqual(ResponseStatus.Ok)
})

test("second try for connection process return error", async () => {
  await device.connect()
  const response = await device.connect()
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})

test("allows to programmatically disconnect the device", async () => {
  const response = await device.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("disconnecting not connected device returns OK status", async () => {
  const response = await device.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test("emits a signal when the device disconnects automatically", async (done) => {
  await device.connect()
  device.on(DeviceEventName.Disconnected, done)

  // emits fake disconnected event
  await device.disconnect()
})

test("unregister listener isn't triggering after emits event", async (done) => {
  await device.connect()
  const listener = () => {
    throw new Error()
  }
  device.on(DeviceEventName.Disconnected, listener)
  device.off(DeviceEventName.Disconnected, listener)

  device.on(DeviceEventName.Disconnected, done)
  // emits fake disconnected event
  await device.disconnect()
})

test("request method return error if device isn't connected", async () => {
  const response = await device.request({
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  })
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})
