import mockSerialPort from "./mock-serial-port"
import PureNode from "./index"

beforeEach(() => {
  mockSerialPort()
})

test("allow a listing of attached devices", async () => {
  const [device] = await PureNode.getDevices()
  expect(device).not.toBeUndefined()
})
