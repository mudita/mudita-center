import { ApiRequestConfig, Endpoint, Method, RequestConfig } from "./device.types"

export const isApiRequestConfig = (config: RequestConfig) : config is ApiRequestConfig => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}