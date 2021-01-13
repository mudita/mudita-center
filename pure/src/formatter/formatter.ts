import { Method, RequestConfig, Response } from "../device/device.types"

export abstract class Formatter {
  abstract formatRequestConfig(config: RequestConfig): RequestConfig
  abstract formatResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
}
