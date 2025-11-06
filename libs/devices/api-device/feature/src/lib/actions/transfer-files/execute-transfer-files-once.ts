/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ExecuteTransferFn,
  TransferFileEntry,
  TransferFilesActionType,
  TransferFilesParams,
  TransferFilesTypes,
  TransferMode,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { TransferProgress } from "app-utils/models"
import { serialUploadFiles } from "../serial-upload-files/serial-upload-files"
import { serialDownloadFiles } from "../serial-download-files/serial-download-files"
import { mtpUploadFiles } from "../mtp-upload-files/mtp-upload-files"
import { mtpDownloadFiles } from "../mtp-download-files/mtp-download-files"

export async function executeTransferFilesOnce(
  params: TransferFilesParams<ApiDevice>,
  transferMode: TransferMode,
  files: TransferFileEntry[],
  onProgress: (p: TransferProgress) => void
) {
  const exec = getExecuteTransfer(transferMode, params.action)
  return exec({
    ...params,
    files,
    transferMode,
    onProgress,
  })
}

const strategyRegistry: Partial<
  Record<TransferFilesTypes, ExecuteTransferFn<ApiDevice>>
> = {
  [`${TransferMode.Serial}:${TransferFilesActionType.Upload}`]:
    serialUploadFiles,
  [`${TransferMode.Serial}:${TransferFilesActionType.Download}`]:
    serialDownloadFiles,
  [`${TransferMode.Mtp}:${TransferFilesActionType.Upload}`]: mtpUploadFiles,
  [`${TransferMode.Mtp}:${TransferFilesActionType.Download}`]: mtpDownloadFiles,
}

export function getExecuteTransfer(
  mode: TransferMode,
  action: TransferFilesActionType
): ExecuteTransferFn<ApiDevice> {
  const key: TransferFilesTypes = `${mode}:${action}`
  const fn = strategyRegistry[key]
  if (!fn) {
    throw new Error(
      `No executeTransfer function found for mode: ${mode}, action: ${action}`
    )
  }
  return fn
}
