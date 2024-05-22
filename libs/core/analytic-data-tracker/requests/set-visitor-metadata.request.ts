/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcAnalyticDataTrackerEvent } from "Core/analytic-data-tracker/constants"
import { VisitorMetadata } from "Core/analytic-data-tracker/services"

export const setVisitorMetadataRequest = async (
  visitorMetadata: VisitorMetadata
): Promise<void> => {
  return ipcRenderer.callMain(
    IpcAnalyticDataTrackerEvent.SetVisitorMetadata,
    visitorMetadata
  )
}
