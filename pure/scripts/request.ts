import { RequestConfig } from "../src"
import { establishConnection } from "./establish-connection"
import singleRequest from "./single-request"

interface Arguments {
  requestConfigString: string
}

const request = ({ requestConfigString }: Arguments) => {
  establishConnection(async (device) => {
    const requestConfig = JSON.parse(requestConfigString) as RequestConfig
    await singleRequest(device, requestConfig)
  })
}

export default request
