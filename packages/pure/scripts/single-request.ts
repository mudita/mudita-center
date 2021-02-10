import { PureDevice, RequestConfig } from "../src"

const singleRequest = async (
  device: PureDevice,
  requestConfig: RequestConfig
) => {
  console.log("request: ", JSON.stringify(requestConfig))

  const response = await device.request(requestConfig)

  console.log("response: ", JSON.stringify(response))
}

export default singleRequest
