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
  constructor(
    public readonly type: Type,
    public readonly message: string = "",
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public readonly payload?: Payload
  ) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
