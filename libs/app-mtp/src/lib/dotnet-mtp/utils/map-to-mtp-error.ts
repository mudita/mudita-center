/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MTPError } from "../../app-mtp.interface"
import { StatusCode } from "../dotnet-mtp.interface"

export function translateStatus(statusCode: StatusCode): MTPError {
  if (statusCode === StatusCode.UnknownDevice) {
    return MTPError.MTP_DEVICE_NOT_FOUND
  } else {
    return MTPError.MTP_GENERAL_ERROR
  }
}
