/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppErrorType } from "./app-error"

export type AppSuccessResult<Data> = { ok: true; data: Data }
export type AppFailedResult<
  ErrorType extends AppErrorType = AppErrorType,
  ErrorData = unknown,
> = {
  ok: false
  error: AppError<ErrorType>
  data?: ErrorData
}

export type AppResult<
  Data,
  ErrorType extends AppErrorType = AppErrorType,
  ErrorData = unknown,
> = AppSuccessResult<Data> | AppFailedResult<ErrorType, ErrorData>

export const AppResultFactory = {
  success<Data>(data: Data): AppSuccessResult<Data> {
    return { ok: true, data }
  },

  failed<ErrorType extends AppErrorType = AppErrorType, ErrorData = unknown>(
    error: AppError<ErrorType>,
    data?: ErrorData
  ): AppFailedResult<ErrorType, ErrorData> {
    return { ok: false, error, data }
  },
}
