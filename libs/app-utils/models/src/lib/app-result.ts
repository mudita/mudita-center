/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppErrorName } from "./app-error"

export type AppSuccessResult<Data> = { ok: true; data: Data }
export type AppFailedResult<
  ErrorName extends AppErrorName = AppErrorName,
  ErrorData = unknown,
> = {
  ok: false
  error: AppError<ErrorName>
  data?: ErrorData
}

export type AppResult<
  Data,
  ErrorName extends AppErrorName = AppErrorName,
  ErrorData = unknown,
> = AppSuccessResult<Data> | AppFailedResult<ErrorName, ErrorData>

export const AppResultFactory = {
  success<
    Data,
    Fields extends Record<string, unknown> = Record<string, unknown>,
  >(data: Data, fields: Fields = {} as Fields): AppSuccessResult<Data> & Fields {
    return { ok: true, data, ...fields }
  },

  failed<
    ErrorName extends AppErrorName = AppErrorName,
    ErrorData = unknown,
    Fields extends Record<string, unknown> = Record<string, unknown>,
  >(
    error: AppError<ErrorName>,
    data?: ErrorData,
    fields: Fields = {} as Fields
  ): AppFailedResult<ErrorName, ErrorData> {
    return { ok: false, error, data, ...fields }
  },
}
