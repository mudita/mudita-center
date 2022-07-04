/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class AppError<Type extends string = string> extends Error {
  constructor(
    public readonly type: Type,
    public readonly message: string,
    public readonly payload?: any
  ) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
