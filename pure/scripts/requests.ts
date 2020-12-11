import { establishConnection } from "./establish-connection"
import singleRequest from "./single-request"
import parseRequestConfigs from "./parse-request-configs"

interface Arguments {
  requestConfigsString: string
}

const requests = async ({ requestConfigsString }: Arguments) => {
  const requestConfigs = parseRequestConfigs(requestConfigsString)

  establishConnection(async (device) => {
    for (const requestConfig of requestConfigs) {
      await singleRequest(device, requestConfig)
    }
  })
}

export default requests
