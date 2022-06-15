/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TemplateError } from "App/templates/constants"

export class UpdateTemplateError extends Error {
  public type = TemplateError.UpdateTemplate

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UpdateTemplateError)
    }
  }
}
