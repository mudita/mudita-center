/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { isAxiosError } from "axios"
import {
  AppError,
  AppErrorName,
  AppHttpFailedResult,
  AppHttpRequestConfig,
  AppHttpResult,
  AppResultFactory,
} from "app-utils/models"

// TODO: Candidate for a utility function
const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error
  if (error instanceof Error) return error.message
  return String(error)
}

export class AppHttpService {
  static async request<Data = unknown>(
    config: AppHttpRequestConfig
  ): Promise<AppHttpResult<Data>> {
    try {
      const { data, status } = await axios.request<Data>(config)
      return AppResultFactory.success(data, { status })
    } catch (error) {
      return AppHttpService.mapAppHttpFailedResult<Data>(error)
    }
  }

  private static mapAppHttpFailedResult<ErrorData = unknown>(
    error: unknown
  ): AppHttpFailedResult<AppErrorName, ErrorData> {
    if (isAxiosError(error)) {
      return AppResultFactory.failed(
        new AppError(getErrorMessage(error)),
        error.response?.data as ErrorData,
        { status: error.response?.status }
      )
    }
    return AppResultFactory.failed(new AppError(getErrorMessage(error)))
  }
}
