/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import { AppHttpRequestConfig, AppHttpResponse } from "app-utils/models"

// TODO: Implement AppError (or ObjectResult pattern)
const isError = (error: unknown): error is Error => {
  return error !== null && typeof error === "object" && "type" in error
}

const mapToError = (error: unknown): Error => {
  if (isError(error)) {
    return error
  }
  return new Error("Unknown error occurred")
}

export class AppHttpService {
  async request<T = unknown>(
    config: AppHttpRequestConfig
  ): Promise<AppHttpResponse<T> | Error> {
    try {
      const { data, status } = await axios.request<T>(config)
      return { data, status }
    } catch (error) {
      return mapToError(error)
    }
  }
}
