/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosError } from "axios"
import {
  AppError,
  AppErrorType,
  AppHttpFailedResult,
  AppHttpRequestConfig,
  AppHttpResult,
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
      return { ok: true, data, status }
    } catch (error) {
      return AppHttpService.mapAppHttpFailedResult<Data>(error)
    }
  }
  private static isAxiosError(error: unknown): error is AxiosError {
    return (
      typeof error === "object" &&
      error !== null &&
      "isAxiosError" in error &&
      (error as any).isAxiosError === true
    );
  }

  private static mapAppHttpFailedResult<ErrorData = unknown>(
    error: unknown
  ): AppHttpFailedResult<AppErrorType, ErrorData> {
    if (this.isAxiosError(error)) {
      return {
        ok: false,
        error: new AppError(error.message),
        data: error.response?.data as ErrorData,
        status: error.response?.status,
      };
    }
    return { ok: false, error: new AppError(getErrorMessage(error)) };
  }
}
