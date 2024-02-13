/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIServerServiceEvents, ServerAPIDeviceOSVersion } from "device/models"

export const getDeviceOSVersion = (
  productId: string,
  vendorId: string
): Promise<ResultObject<ServerAPIDeviceOSVersion>> => {
  return ipcRenderer.callMain(APIServerServiceEvents.GetAPIDeviceOSVersion, {
    productId,
    vendorId,
  })
}
