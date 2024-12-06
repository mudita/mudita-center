/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { Feature } from "generic-view/models"
import { APIFeaturesServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"

export const getFeatureDataRequest = (
  deviceId: DeviceId,
  feature: string
): Promise<ResultObject<Feature["data"]>> => {
  return ipcRenderer.callMain(APIFeaturesServiceEvents.FeatureData, {
    deviceId,
    feature,
  })
}
