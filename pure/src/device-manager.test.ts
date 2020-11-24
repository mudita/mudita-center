import mockSerialPort from "./mock-serial-port"
import DeviceManager from "./index"

beforeEach(() => {
  mockSerialPort()
})

test("allow a listing of attached devices", async () => {
  const [device] = await DeviceManager.getDevices()
  expect(device).not.toBeUndefined()
})
