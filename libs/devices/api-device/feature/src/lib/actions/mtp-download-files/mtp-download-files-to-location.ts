/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ExecuteTransferResult,
  TransferDownloadFilesToLocationParams,
  TransferFilesActionType,
} from "devices/common/models"
import { Platform } from "app-utils/models"
import { platform, sliceSegments } from "app-utils/common"
import { isMtpPathInternal, sliceMtpPaths } from "../mtp-shared/mtp-helpers"
import { mtpTransferFiles } from "../mtp-shared/mtp-transfer-files"

export const mtpDownloadFilesToLocation = async (
  params: TransferDownloadFilesToLocationParams
): Promise<ExecuteTransferResult> => {
  return mtpTransferFiles({
    ...params,
    files: params.files.map(({ id, source, target }) => {
      const isInternal = isMtpPathInternal(source.path)
      const destinationPathPrefix = platform === Platform.windows ? "" : "/"
      const destinationPath = sliceSegments(target.path, 0, -1)

      return {
        id,
        isInternal,
        fileSize: source.fileSize,
        fileName: source.path.split("/").pop() || "",
        sourcePath: sliceMtpPaths(source.path, isInternal),
        destinationPath: `${destinationPathPrefix}${destinationPath}`,
        action: TransferFilesActionType.Download,
      }
    }),
  })
}
