/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "../device"

export interface GetFileSystemRequestPayload
  extends RequestConfig<{
    fileName: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Get
}

export interface GetFileSystemResponse
  extends Response<{
    rxID: string
    fileSize: number
    chunkSize: number
  }> {
  status: ResponseStatus.Ok
}

export interface GetFileSystemErrorResponse
  extends Response<{
    reason: string
  }> {
  status: ResponseStatus.NotFound
}

export interface DownloadFileSystemRequestPayload
  extends RequestConfig<{
    rxID: string
    chunkNo: number
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Get
}

export interface DownloadFileSystemResponse
  extends Response<{
    rxID: string
    chunkNo: number
    data: string
  }> {
  status: ResponseStatus.Ok
}

export interface DownloadFileSystemErrorResponse
  extends Response<{
    rxID: string
    reason: string
  }> {
  status: ResponseStatus.NotFound
}
