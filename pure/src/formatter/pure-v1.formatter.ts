import { Endpoint, Method, RequestConfig, Response } from "../device.types"
import { Formatter } from "./formatter"

export class PureV1Formatter extends Formatter {
  formatRequestConfig(config: RequestConfig): RequestConfig {
    const { endpoint, method, body } = config
    if (endpoint === Endpoint.Contacts && method === Method.Post) {
      return { ...config, body: { ...body, id: Number(body.id) } }
    }

    if (endpoint === Endpoint.Contacts && method === Method.Delete) {
      return { ...config, body: { ...body, id: Number(body.id) } }
    }

    return config
  }

  formatResponse(method: Method, response: Response<any>): Response<any> {
    const { endpoint, body } = response
    if (endpoint === Endpoint.Contacts && method === Method.Put) {
      return { ...response, body: { ...body, id: String(body.id) } }
    }
    return response
  }
}
