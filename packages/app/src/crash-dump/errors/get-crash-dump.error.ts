/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CrashDumpError } from "App/crash-dump/constants"

export class GetCrashDumpError extends Error {
  public type = CrashDumpError.Getting

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetCrashDumpError)
    }
  }
}
