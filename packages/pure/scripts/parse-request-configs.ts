import { RequestConfig } from "../src"

const parseRequestConfigs = (requestConfigsString = ""): RequestConfig[] => {
  if (requestConfigsString === "") {
    throw new Error("RequestConfig isn't valid")
  }

  const requestConfigs = JSON.parse(requestConfigsString) as RequestConfig[]

  if (
    !Array.isArray(requestConfigs) ||
    requestConfigs.some(({ endpoint, method }) => {
      return !(Number.isInteger(endpoint) && Number.isInteger(method))
    })
  ) {
    throw new Error("RequestConfig isn't valid")
  }

  return requestConfigs
}

export default parseRequestConfigs
