import PureDeviceManager, { PureDevice } from "../src"
import { ResponseStatus } from "../dist"

export const establishConnection = async (command: (device: PureDevice) => void) => {
  const [device] = await PureDeviceManager.getDevices()

  if (!device) {
    throw new Error("Pure isn't connected")
  }

  const { status } = await device.connect()

  if (status !== ResponseStatus.Ok) {
    throw new Error("The connection isn't possible")
  }

  await command(device)

  await device.disconnect()

  process.exit(0)
}
