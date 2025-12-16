/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  TransferFileEntry,
  TransferFilesActionType,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { Platform } from "app-utils/models"
import { platform, sliceSegments } from "app-utils/common"
import { isMtpPathInternal, sliceMtpPaths } from "../mtp-shared/mtp-helpers"
import { mtpTransferFiles } from "../mtp-shared/mtp-transfer-files"

export interface MtpDownloadEntry extends TransferFileEntry {
  source: { type: "path"; path: string; fileSize: number }
  target: { type: "path"; path: string }
}

export interface MtpDownloadFilesParams
  extends ExecuteTransferParams<ApiDevice> {
  files: MtpDownloadEntry[]
}

const isMtpDownloadFilesParams = (
  params: ExecuteTransferParams<ApiDevice>
): params is MtpDownloadFilesParams => {
  const first = params.files?.[0]
  return first?.target.type === "path"
}

export const mtpDownloadFiles = async (
  params: ExecuteTransferParams<ApiDevice>
): Promise<ExecuteTransferResult> => {
  if (!isMtpDownloadFilesParams(params)) {
    throw new Error("Invalid parameters for mtpDownloadFiles")
  }

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
