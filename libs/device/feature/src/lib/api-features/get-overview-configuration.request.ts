/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIFeaturesServiceEvents, OverviewData } from "device/models"

export const getOverviewDataRequest = (): Promise<
  ResultObject<OverviewData>
> => {
  return ipcRenderer.callMain(APIFeaturesServiceEvents.GetOverviewData)
}
