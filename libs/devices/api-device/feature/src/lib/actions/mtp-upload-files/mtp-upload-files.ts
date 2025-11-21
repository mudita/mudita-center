/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
} from "devices/common/models"
import {
  mtpUploadFilesFromPath,
  MtpUploadFilesFromPathParams,
} from "./mtp-upload-files-from-path"

const isUploadFilesFromPathsParams = (
  params: ExecuteTransferParams<ApiDevice>
): params is MtpUploadFilesFromPathParams => {
  return params.files[0].source.type === "fileLocation"
}

export const mtpUploadFiles = (
  params: ExecuteTransferParams<ApiDevice>
): Promise<ExecuteTransferResult> => {
  if (isUploadFilesFromPathsParams(params)) {
    return mtpUploadFilesFromPath(params)
  } else {
    throw new Error("Invalid parameters for mtpUploadFiles")
  }
}
