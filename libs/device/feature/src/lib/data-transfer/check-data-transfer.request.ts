/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIDataTransferServiceEvents, DataTransfer } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const checkDataTransferRequest = (
  dataTransferId: number,
  deviceId?: DeviceId
): Promise<ResultObject<DataTransfer>> => {
  return ipcRenderer.callMain(APIDataTransferServiceEvents.CheckDataTransfer, {
    dataTransferId,
    deviceId,
  })
}
