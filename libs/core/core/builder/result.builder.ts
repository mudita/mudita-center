/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppErrorType } from "Core/core/errors"

export type ResultObject<
  Data,
  ErrorType extends AppErrorType = AppErrorType,
  ErrorData = unknown
> = SuccessResult<Data> | FailedResult<ErrorData, ErrorType>

export class SuccessResult<Data> {
  public error = undefined
  public ok: true = true

  constructor(public data: Data) {}
}

export class FailedResult<Data, ErrorType extends AppErrorType = AppErrorType> {
  public ok: false = false

  constructor(
    public error: AppError<ErrorType>,
    public data: Data | undefined
  ) {}
}

export class Result {
  static success<Data>(data: Data): SuccessResult<Data> {
    return new SuccessResult<Data>(data)
  }

  static failed<Data, ErrorType extends AppErrorType = AppErrorType>(
    error: AppError<ErrorType>,
    data?: Data
  ): FailedResult<Data, ErrorType> {
    return new FailedResult<Data, ErrorType>({ ...error }, data)
  }
}
