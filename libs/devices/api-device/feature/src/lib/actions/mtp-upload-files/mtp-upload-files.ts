/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError, AppResultFactory } from "app-utils/models"
import { AppMtp } from "app-mtp/renderer"
import {
  ExecuteTransferFn,
  ExecuteTransferParams,
  ExecuteTransferResult,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { delay } from "app-utils/common"
import { ApiDeviceMTPTransferErrorName } from "../transfer-files/transfer-files.types"

export const mtpUploadFiles: ExecuteTransferFn<ApiDevice> = async (
  params: ExecuteTransferParams<ApiDevice>
): Promise<ExecuteTransferResult> => {
  // mock implementation to handle transfer progress warnings

  await delay(5000) // Simulate some delay for the MTP upload process

  const deviceId = await AppMtp.getMtpDeviceId(params.device)
  console.log("MTP Upload Files called for deviceId:", deviceId)

  return AppResultFactory.failed(
    new AppError("", ApiDeviceMTPTransferErrorName.MtpInitializeAccessError),
    {
      failed: params.files.map((file) => ({
        id: file.id,
        errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
      })),
    }
  )
}
