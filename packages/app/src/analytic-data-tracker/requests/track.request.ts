/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcAnalyticDataTrackerRequest } from "App/analytic-data-tracker/constants"
import { trackEvent } from "App/analytic-data-tracker/services"

export const trackRequest = async (event: trackEvent): Promise<void> => {
  return ipcRenderer.callMain(IpcAnalyticDataTrackerRequest.Track, event)
}
