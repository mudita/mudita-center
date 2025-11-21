/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppFailedResult, AppResultFactory } from "app-utils/models"
import { MTPError } from "app-mtp/models"
import { isAppError, isMessageInError } from "./is-app-error"

export const handleMtpError = (error: unknown): AppFailedResult => {
  return AppResultFactory.failed(mapToMtpError(error))
}

export const mapToMtpError = (error: unknown): AppError => {
  if (isAppError(error)) {
    return error
  } else {
    if (isMessageInError(error) && hasLibusbAccessError(error.message)) {
      return new AppError("", MTPError.MTP_INITIALIZE_ACCESS_ERROR)
    } else {
      return new AppError("", MTPError.MTP_GENERAL_ERROR)
    }
  }
}

const hasLibusbAccessError = (message: string): boolean =>
  ["LIBUSB_ERROR_BUSY", "LIBUSB_ERROR_ACCESS"].some((code) =>
    message.includes(code)
  )
