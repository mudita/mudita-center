import { RequestConfig } from "../src"
import { establishConnection } from "./establish-connection"
import singleRequest from "./single-request"

interface Arguments {
  requestConfigsString: string
}

const requests = async ({ requestConfigsString }: Arguments) => {
  establishConnection(async (device) => {
    const requestConfigs = JSON.parse(requestConfigsString) as RequestConfig[]

    for (const requestConfig of requestConfigs) {
      await singleRequest(device, requestConfig)
    }
  })
}

export default requests
