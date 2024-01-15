/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIFeaturesServiceEvents, OverviewConfig } from "device/models"

export const getOverviewConfigRequest = (): Promise<
  ResultObject<OverviewConfig>
> => {
  return ipcRenderer.callMain(APIFeaturesServiceEvents.GetOverviewConfiguration)
}
