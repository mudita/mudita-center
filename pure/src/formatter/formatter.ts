import { Method, RequestConfig, Response } from "../device.types"

export abstract class Formatter {
  abstract formatRequestConfig(config: RequestConfig): any
  abstract formatResponse(method: Method, response: Response<any>): any
}
