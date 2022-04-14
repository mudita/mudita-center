/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Response, ResponseStatus } from "./response.types"
import { Endpoint, Method, RequestConfig } from "./request.types"

export interface PutFileSystemRequestConfig
  extends RequestConfig<{
    fileName: string
    fileSize: number
    fileCrc32: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Put
}

export interface PutFileSystemResponse
  extends Response<{
    txID: string
    chunkSize: number
  }> {
  status: ResponseStatus
}

export interface PutFileSystemErrorResponse
  extends Response<{
    reason: string
  }> {
  status: ResponseStatus
}

export interface SendFileSystemRequestConfig
  extends RequestConfig<{
    txID: string
    chunkNo: number
    data: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Put
}

export interface SendFileSystemResponse
  extends Response<{
    txID: string
    chunkNo: number
  }> {
  status: ResponseStatus
}

export interface SendFileSystemErrorResponse
  extends Response<{
    txID: string
    reason: string
  }> {
  status: ResponseStatus
}

export interface GetFileSystemRequestConfig
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
    fileCrc32: string
  }> {
  status: ResponseStatus
}

export interface GetFileSystemErrorResponse
  extends Response<{
    reason: string
  }> {
  status: ResponseStatus
}

export interface DownloadFileSystemRequestConfig
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
  status: ResponseStatus
}

export interface DownloadFileSystemErrorResponse
  extends Response<{
    rxID: string
    reason: string
  }> {
  status: ResponseStatus
}

export interface RemoveFileSystemRequestConfig
  extends RequestConfig<{
    removeFile: string
  }> {
  endpoint: Endpoint.FileSystem
  method: Method.Delete
}

export interface RemoveFileSystemResponse extends Response<{}> {
  status: ResponseStatus
}

export interface RemoveFileSystemErrorResponse extends Response<{}> {
  status: ResponseStatus
}
