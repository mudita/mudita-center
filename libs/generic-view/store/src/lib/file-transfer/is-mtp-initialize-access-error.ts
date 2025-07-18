/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiFileTransferError } from "device/models"
import { AppError } from "Core/core/errors"

export const isMtpInitializeAccessError = (
  error: unknown
): error is ApiFileTransferError => {
  try {
    return (
      (error as AppError).type === ApiFileTransferError.MtpInitializeAccessError
    )
  } catch (_) {
    return false
  }
}
