import mockSerialPort from "./mock-serial-port"
import PureNode from "./index"

beforeEach(() => {
  mockSerialPort()
})

test("allow a listing of attached phones", async () => {
  const [phonePort] = await PureNode.getPhonePorts()
  expect(phonePort).not.toBeUndefined()
})
