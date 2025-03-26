/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "../../../../core/core/errors/app-error"

export const isAppError = (error: unknown): error is AppError => {
  return error !== null && typeof error === "object" && "type" in error
}
