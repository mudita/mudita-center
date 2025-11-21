/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppMtp } from "app-mtp/renderer"
import { buildFailedResult } from "./mtp-helpers"
import {
  ExecuteTransferAppFailedResult,
  FailedTransferErrorName,
} from "devices/common/models"
import { ApiDeviceMTPTransferErrorName } from "../transfer-files/transfer-files.types"
import { MtpTransferFilesParams } from "./mtp-transfer-files"
import { AppResultFactory, AppSuccessResult } from "app-utils/models"
import { MtpStorage } from "app-mtp/models"

type PrepareMtpTransferResult =
  | AppSuccessResult<{
      deviceId: string
      storages: MtpStorage[]
    }>
  | ExecuteTransferAppFailedResult

interface PrepareMtpTransferParams {
  device: MtpTransferFilesParams["device"]
  files?: MtpTransferFilesParams["files"]
  abortController?: MtpTransferFilesParams["abortController"]
}

export const prepareMtpTransfer = async ({
  device,
  files = [],
  abortController,
}: PrepareMtpTransferParams): Promise<PrepareMtpTransferResult> => {
  const deviceId = await AppMtp.getMtpDeviceId(device)

  if (abortController?.signal.aborted) {
    return buildFailedResult(files, FailedTransferErrorName.Aborted)
  }

  if (!deviceId) {
    return buildFailedResult(
      files,
      ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
    )
  }

  const getDeviceStoragesResult = await AppMtp.getDeviceStorages(deviceId)

  if (abortController?.signal.aborted) {
    return buildFailedResult(files, FailedTransferErrorName.Aborted)
  }

  const storages = getDeviceStoragesResult.ok
    ? getDeviceStoragesResult.data
    : []

  if (!getDeviceStoragesResult.ok || storages.length === 0) {
    return buildFailedResult(
      files,
      ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
    )
  }

  return AppResultFactory.success({
    deviceId,
    storages,
  })
}
