/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TemplateError } from "App/templates/constants"

export class UpdateTemplateOrderError extends Error {
  public type = TemplateError.UpdateTemplateOrder

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UpdateTemplateOrderError)
    }
  }
}
