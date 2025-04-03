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
import { isAppError } from "./is-app-error"

export const handleMtpError = (error: unknown): FailedResult<void> => {
  if (isAppError(error)) {
    return Result.failed(error)
  } else {
    return Result.failed(new AppError(MTPError.MTP_GENERAL_ERROR))
  }
}
