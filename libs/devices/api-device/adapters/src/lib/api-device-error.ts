/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceErrorType } from "api-device/models"

export class ApiDeviceError extends Error {
  public status: ApiDeviceErrorType
  public details?: unknown

  constructor(status: ApiDeviceErrorType, details?: unknown) {
    super(ApiDeviceErrorType[status])
    this.name = "ApiDeviceError"
    this.status = status
    if (details) {
      this.details = details
    }
  }

  static ensure(error: unknown): asserts error is ApiDeviceError {
    if (!(error instanceof ApiDeviceError)) {
      throw error
    }
  }
}
