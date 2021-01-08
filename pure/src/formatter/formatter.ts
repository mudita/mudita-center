import { Method, RequestConfig, Response } from "../device"

export abstract class Formatter {
  abstract formatRequestConfig(config: RequestConfig): RequestConfig
  abstract formatResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
}
