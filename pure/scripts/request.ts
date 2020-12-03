import PureDeviceManager, { RequestConfig } from "../src"
import { ResponseStatus } from "../dist"

interface Arguments {
  requestConfigString: string
}

const request = async ({ requestConfigString }: Arguments) => {
  const requestConfig = JSON.parse(requestConfigString) as RequestConfig

  if (
    requestConfig.endpoint === undefined ||
    requestConfig.method === undefined
  ) {
    throw new Error("RequestConfig isn't valid")
  }

  const [device] = await PureDeviceManager.getDevices()

  if (!device) {
    throw new Error("Pure isn't connected")
  }

  const { status } = await device.connect()

  if (status !== ResponseStatus.Ok) {
    throw new Error("The connection isn't possible")
  }

  console.log("request: ", JSON.stringify(requestConfig))

  const response = await device.request(requestConfig)

  console.log("response: ", JSON.stringify(response))

  await device.disconnect()

  process.exit(0)
}

export default request
