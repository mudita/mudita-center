/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ExecuteTransferParams,
  ExecuteTransferResult,
} from "devices/common/models"
import {
  serialUploadFilesFromPath,
  UploadFilesFromPathsParams,
} from "./serial-upload-files-from-path"
import {
  uploadFilesFromData,
  UploadFilesFromDataParams,
} from "./serial-upload-files-from-data"
import { ApiDevice } from "devices/api-device/models"

const isUploadFilesFromDataParams = (
  params: ExecuteTransferParams<ApiDevice>
): params is UploadFilesFromDataParams => {
  return params.files[0].source.type === "memory"
}

const isUploadFilesFromPathsParams = (
  params: ExecuteTransferParams<ApiDevice>
): params is UploadFilesFromPathsParams => {
  return params.files[0].source.type === "fileLocation"
}

export const serialUploadFiles = (
  params: ExecuteTransferParams<ApiDevice>
): Promise<ExecuteTransferResult> => {
  if (isUploadFilesFromDataParams(params)) {
    return uploadFilesFromData(params)
  } else if (isUploadFilesFromPathsParams(params)) {
    return serialUploadFilesFromPath(params)
  } else {
    throw new Error("Invalid parameters for serialUploadFiles")
  }
}
