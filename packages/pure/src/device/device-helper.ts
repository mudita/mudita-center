/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiRequestPayload,
  DeviceUpdateRequestPayload,
  Endpoint,
  Method,
  RequestPayload,
} from "./device.types"
import { UploadUpdateFileSystemRequestPayload } from "../endpoints"

export const isApiRequestPayload = (
  config: RequestPayload
): config is ApiRequestPayload => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}

export const isUploadUpdateFileSystemPayload = (
  config: RequestPayload
): config is UploadUpdateFileSystemRequestPayload => {
  return (
    config.endpoint === Endpoint.UploadUpdateFileSystem &&
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
