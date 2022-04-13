/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcAnalyticDataTrackerRequest } from "App/analytic-data-tracker/constants"

export const toggleTrackingRequest = async (flag: boolean): Promise<void> => {
  return ipcRenderer.callMain(IpcAnalyticDataTrackerRequest.ToggleTracking, flag)
}
