/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FailedResult,
  Result,
} from "../../../../core/core/builder/result.builder"
import { AppError } from "../../../../core/core/errors/app-error"
import { MTPError } from "../app-mtp.interface"
import { isAppError, isMessageInError } from "./is-app-error"

export const handleMtpError = (error: unknown): FailedResult<void> => {
  return Result.failed(mapToMtpError(error))
}

export const mapToMtpError = (error: unknown): AppError => {
  if (isAppError(error)) {
    return error
  } else if (isMessageInError(error) && hasLibusbAccessError(error.message)) {
    return new AppError(MTPError.MTP_INITIALIZE_ACCESS_ERROR)
  } else {
    return new AppError(MTPError.MTP_GENERAL_ERROR)
  }
}

const hasLibusbAccessError = (message: string): boolean =>
  ["LIBUSB_ERROR_BUSY", "LIBUSB_ERROR_ACCESS"].some((code) =>
    message.includes(code)
  )
