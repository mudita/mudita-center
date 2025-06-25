/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosRequestConfig, AxiosResponse, Method } from "axios"

export interface AppHttpRequestConfig extends AxiosRequestConfig {
  url: string
  method: Method
  data?: Record<string, unknown>
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

export type AppHttpResponse<T = unknown> = Pick<
  AxiosResponse<T>,
  "data" | "status"
>
