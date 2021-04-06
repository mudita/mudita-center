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
  RequestPayload,
} from "./device.types"

export const isApiRequestPayload = (
  config: RequestPayload
): config is ApiRequestPayload => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}

export const isFileUploadPayload = (
  config: RequestPayload
): config is FileUploadRequestPayload => {
  return (
    config.endpoint === Endpoint.FileUpload &&
    config.method === Method.Post &&
    Boolean(config.filePath)
  )
}

export const isDeviceUpdateRequestPayload = (
  config: RequestPayload
): config is DeviceUpdateRequestPayload => {
  return (
    config.endpoint === Endpoint.DeviceUpdate &&
    config.method === Method.Post &&
    Boolean(config.filePath)
  )
}
