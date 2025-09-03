/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig, Method } from "axios"
import { AppFailedResult, AppSuccessResult } from "./app-result"
import { AppErrorName } from "./app-error"
import { AppFileSystemScopeOptions } from "./app-file-system"

export interface AppHttpRequestConfig extends AxiosRequestConfig {
  url: string
  method: Method
  data?: Record<string, unknown>
  params?: Record<string, unknown>
  headers?: Record<string, string>
  files?: Record<string, AppFileSystemScopeOptions>
  rid?: string
}

export type AppHttpSuccessResult<Data> = AppSuccessResult<Data> & {
  status: number
}
export type AppHttpFailedResult<
  ErrorName extends AppErrorName = AppErrorName,
  ErrorData = unknown,
> = AppFailedResult<ErrorName, ErrorData> & {
  status?: number
}

export type AppHttpResult<
  Data = unknown,
  ErrorName extends AppErrorName = AppErrorName,
  ErrorData = unknown,
> = AppHttpSuccessResult<Data> | AppHttpFailedResult<ErrorName, ErrorData>
