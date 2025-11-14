/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sliceSegments } from "app-utils/common"
import { AppError, AppResultFactory } from "app-utils/models"
import {
  ExecuteTransferAppFailedResult,
  FailedTransferErrorName,
} from "devices/common/models"
import { ApiDeviceMTPTransferErrorName } from "../transfer-files/transfer-files.types"

const internalPathPrefix = "/storage/emulated/0/"

export const isMtpPathInternal = (path: string) => {
  return path.startsWith(internalPathPrefix)
}

export const sliceMtpPaths = (path: string, isInternal: boolean) => {
  return isInternal
    ? path.replace(internalPathPrefix, "").replace(/\/$/, "")
    : sliceSegments(path, 2)
}

export const buildFailedResult = (
  files: { id: string }[],
  errorName: ApiDeviceMTPTransferErrorName | FailedTransferErrorName | string
): ExecuteTransferAppFailedResult => {
  return AppResultFactory.failed(new AppError("", errorName), {
    failed: files.map((file) => ({
      id: file.id,
      errorName,
    })),
  })
}
