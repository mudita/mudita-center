/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MTPError } from "../../app-mtp.interface"
import { DotnetCliStatusCode } from "../dotnet-mtp.interface"

export function translateStatus(statusCode: DotnetCliStatusCode): MTPError {
  if (statusCode === DotnetCliStatusCode.UnknownDevice) {
    return MTPError.MTP_DEVICE_NOT_FOUND
  } else if (statusCode === DotnetCliStatusCode.NotEnoughSpace) {
    return MTPError.MTP_NOT_ENOUGH_SPACE
  } else if (statusCode === DotnetCliStatusCode.ServiceUnavailable) {
    return MTPError.MTP_INITIALIZE_ACCESS_ERROR
  } else if (statusCode === DotnetCliStatusCode.FileExists) {
    return MTPError.MTP_FILE_EXISTS_ERROR
  } else {
    return MTPError.MTP_GENERAL_ERROR
  }
}
