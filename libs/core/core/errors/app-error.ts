/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppErrorType = string | number

export class AppError<
  Type extends AppErrorType = AppErrorType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Payload = any
> extends Error {
  override message: string

  constructor(
    public readonly type: Type,
    message: string = "",
    public readonly payload?: Payload
  ) {
    super(message)
    this.message = message

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
