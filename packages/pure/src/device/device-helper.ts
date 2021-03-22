/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiRequestPayload,
  DeviceUpdateRequestPayload,
  Endpoint,
  FileUploadRequestPayload,
  Method,
  RequestConfig,
} from "./device.types"

export const isApiRequestConfig = (
  config: RequestConfig
): config is ApiRequestPayload => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}

export const isFileUploadRequest = (
  config: RequestConfig
): config is FileUploadRequestPayload => {
  return (
    config.endpoint === Endpoint.FileUpload &&
    config.method === Method.Post &&
    Boolean(config.filePath)
  )
}

export const isDeviceUpdateRequestConfig = (
  config: RequestConfig
): config is DeviceUpdateRequestPayload => {
  return (
    config.endpoint === Endpoint.DeviceUpdate &&
    config.method === Method.Post &&
    Boolean(config.filePath)
  )
}
