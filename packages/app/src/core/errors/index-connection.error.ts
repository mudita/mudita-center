/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModelError } from "App/core/constants"

export class IndexConnectionError extends Error {
  public type = ModelError.IndexConnection

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IndexConnectionError)
    }
  }
}
