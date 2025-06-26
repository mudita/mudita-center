/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppErrorType = string

export class AppError<
  Type extends AppErrorType = AppErrorType,
  Payload = unknown,
> extends Error {
  override message: string

  constructor(
    public readonly type: Type = "UnknownError" as Type,
    message = "",
    public readonly payload?: Payload
  ) {
    super(message)
    this.message = message

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
