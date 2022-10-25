/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"

export interface ResultObject<Data> {
  ok: boolean
  data: Data | undefined
  error: AppError | undefined
}

export class SuccessResult<Data> {
  public error = undefined
  public ok = true

  constructor(public data: Data) {}
}

export class FailedResult<Data = undefined> {
  public ok = false

  constructor(public error: AppError, public data: Data) {}
}

export class Result {
  static success<Data>(data: Data): ResultObject<Data> {
    return new SuccessResult<Data>(data)
  }

  static failed<Data = undefined>(
    error: AppError,
    data?: Data
  ): ResultObject<Data> {
    return new FailedResult({ ...error }, data)
  }
}
