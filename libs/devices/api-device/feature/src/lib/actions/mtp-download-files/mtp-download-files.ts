/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  isTransferDownloadFilesToLocationParams,
  isTransferDownloadFilesToMemoryParams,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { mtpDownloadFilesToLocation } from "./mtp-download-files-to-location"
import { mtpDownloadFilesToMemory } from "./mtp-download-files-to-memory"

export const mtpDownloadFiles = async (
  params: ExecuteTransferParams<ApiDevice>
): Promise<ExecuteTransferResult> => {
  if (isTransferDownloadFilesToLocationParams(params)) {
    return mtpDownloadFilesToLocation(params)
  } else if (isTransferDownloadFilesToMemoryParams(params)) {
    return mtpDownloadFilesToMemory(params)
  } else {
    throw new Error(`Unsupported download files params action`)
  }
}
