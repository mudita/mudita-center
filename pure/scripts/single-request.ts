import { PureDevice, RequestConfig } from "../src"

const singleRequest = async (device: PureDevice, requestConfig: RequestConfig) => {
  if (
    requestConfig.endpoint === undefined ||
    requestConfig.method === undefined
  ) {
    throw new Error("RequestConfig isn't valid")
  }

  console.log("request: ", JSON.stringify(requestConfig))

  const response = await device.request(requestConfig)

  console.log("response: ", JSON.stringify(response))
}

export default singleRequest
