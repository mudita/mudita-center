/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcUpdate } from "App/__deprecated__/update/constants"
import { Release } from "App/__deprecated__/update/types"
import { Feature, flags } from "App/feature-flags"

export const getAllReleasesRequest = async (): Promise<Release[]> => {
  if (flags.get(Feature.DeveloperModeEnabled)) {
    return ipcRenderer.callMain<void, Release[]>(IpcUpdate.GetAllReleases)
  } else {
    return []
  }
}
