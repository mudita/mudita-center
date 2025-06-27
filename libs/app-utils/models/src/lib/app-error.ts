/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppErrorName = string

export class AppError<Name extends AppErrorName = AppErrorName> extends Error {
  constructor(
    message = "",
    public readonly name: Name = "UnknownError" as Name
  ) {
    super(message)
    this.name = name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}

export const mapToAppError = (error: unknown): AppError => {
  if (error instanceof AppError) return error

  if (error instanceof Error) {
    return new AppError(error.message, error.name as AppErrorName)
  }

  return new AppError(String(error), "UnknownError")
}
