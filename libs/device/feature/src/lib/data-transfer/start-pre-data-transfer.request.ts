/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import {
  APIDataTransferServiceEvents,
  DataTransferDomain,
  PreDataTransfer,
} from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const startPreDataTransferRequest = (
  domains: DataTransferDomain[],
  deviceId?: DeviceId
): Promise<ResultObject<PreDataTransfer>> => {
  return ipcRenderer.callMain(
    APIDataTransferServiceEvents.StartPreDataTransfer,
    {
      domains,
      deviceId,
    }
  )
}
