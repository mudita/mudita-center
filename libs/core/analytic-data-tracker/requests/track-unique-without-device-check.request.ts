/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcAnalyticDataTrackerEvent } from "Core/analytic-data-tracker/constants"
import { TrackEvent } from "Core/analytic-data-tracker/types"

export const trackUniqueWithoutDeviceCheckRequest = async (
  event: TrackEvent
): Promise<void> => {
  return ipcRenderer.callMain(
    IpcAnalyticDataTrackerEvent.TrackUniqueWithoutDeviceCheck,
    event
  )
}
