/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig, Method } from "axios"
import { AppFailedResult, AppSuccessResult } from "./app-result"
import { AppErrorType } from "./app-error"

export interface AppHttpRequestConfig extends AxiosRequestConfig {
  url: string
  method: Method
  data?: Record<string, unknown>
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

export type AppHttpSuccessResult<Data> = AppSuccessResult<Data> & {
  status: number
}
export type AppHttpFailedResult<
  ErrorType extends AppErrorType = AppErrorType,
  ErrorData = unknown,
> = AppFailedResult<ErrorType, ErrorData> & {
  status?: number
}

export type AppHttpResult<
  Data = unknown,
  ErrorType extends AppErrorType = AppErrorType,
  ErrorData = unknown,
> = AppHttpSuccessResult<Data> | AppHttpFailedResult<ErrorType, ErrorData>
