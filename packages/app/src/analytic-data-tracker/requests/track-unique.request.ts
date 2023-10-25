/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcAnalyticDataTrackerEvent } from "App/analytic-data-tracker/constants"
import { TrackEvent } from "App/analytic-data-tracker/types"

export const trackUniqueRequest = async (event: TrackEvent): Promise<void> => {
  return ipcRenderer.callMain(IpcAnalyticDataTrackerEvent.TrackUnique, event)
}
