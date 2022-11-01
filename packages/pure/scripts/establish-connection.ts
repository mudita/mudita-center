import MuditaDeviceManager from "../src/device-manager.js"
import { MuditaDevice } from "../src/device/device.js"
import { ResponseStatus } from "../src/device/device.types.js"

export const establishConnection = async (
  command: (device: MuditaDevice) => void
) => {
  const [device] = await MuditaDeviceManager.getDevices()

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
