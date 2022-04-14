/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import mockSerialPort from "../mock-serial-port"
import PureNode, {
  MuditaDevice,
  DeviceEventName,
  Endpoint,
  Method,
  RequestConfig,
  ResponseStatus,
} from "../index"

let device: MuditaDevice

beforeEach(async (done) => {
  mockSerialPort()

  const devices = await PureNode.getDevices()
  console.log("devices: ", devices)
  device = devices[0]
  done()
})

jest.mock("p-queue", () => {
  return jest.fn().mockImplementation(() => {
    return {
      add: (fn: () => void) => fn(),
    }
  })
})

test.skip("allow to establish a connection with a given device", async () => {
  const { status } = await device.connect()
  expect(status).toEqual(ResponseStatus.Ok)
})

test.skip("second try for connection process return error", async () => {
  await device.connect()
  const response = await device.connect()
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})

test.skip("allows to programmatically disconnect the device", async () => {
  await device.connect()
  const response = await device.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test.skip("disconnecting not connected device returns OK status", async () => {
  const response = await device.disconnect()
  expect(response.status).toEqual(ResponseStatus.Ok)
})

test.skip("emits a signal when the device disconnects automatically", async (done) => {
  await device.connect()
  device.on(DeviceEventName.Disconnected, done)

  // emits fake disconnected event
  await device.disconnect()
})

test.skip("unregister listener isn't triggering after emits event", async (done) => {
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

test.skip("request method return error if device isn't connected", async () => {
  const response = await device.request({
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  })
  expect(response.status).toEqual(ResponseStatus.ConnectionError)
})

test.skip("multiple requests are executed properly", async () => {
  jest.spyOn(device, "request")
  const config = {} as RequestConfig
  const queue = Array.from({ length: 10 }).map(() => config)

  await device.connect()
  await Promise.all(queue.map((config) => device.request(config)))

  expect(device.request).toBeCalledTimes(10)
})
