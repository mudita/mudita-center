/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIFeaturesServiceEvents } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { View } from "generic-view/utils"

export const getFeatureConfigRequest = (
  deviceId: DeviceId,
  feature: string
): Promise<ResultObject<View>> => {
  return ipcRenderer.callMain(APIFeaturesServiceEvents.FeatureConfiguration, {
    deviceId,
    feature,
  })
}
