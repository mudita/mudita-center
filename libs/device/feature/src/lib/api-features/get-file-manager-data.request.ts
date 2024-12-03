/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { McFileManagerData } from "generic-view/models"
import { APIFeaturesServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export const getFileManagerDataRequest = (
  deviceId: DeviceId
): Promise<ResultObject<McFileManagerData>> => {
  return ipcRenderer.callMain(APIFeaturesServiceEvents.GetFileManagerData, {
    deviceId,
  })
}
