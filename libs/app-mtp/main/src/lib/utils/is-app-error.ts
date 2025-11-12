/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "app-utils/models"

export const isAppError = (error: unknown): error is AppError => {
  return error !== null && typeof error === "object" && "type" in error
}

export const isMessageInError = (
  error: unknown
): error is { message: string } => {
  return error !== null && typeof error === "object" && "message" in error
}
