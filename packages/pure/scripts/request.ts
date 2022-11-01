import requests from "./requests.js"

interface Arguments {
  requestConfigString: string
}

const request = ({ requestConfigString }: Arguments) => {
  requests({ requestConfigsString: `[${requestConfigString}]` })
}

export default request
