/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { ReleaseProcessState, UpdateOsEvent } from "App/update/constants"

export const closeForceUpdateFlow = createAction(
  UpdateOsEvent.CloseForceUpdateFlow
)
export const setCheckForUpdateState = createAction<State>(
  UpdateOsEvent.SetCheckForUpdateState
)
export const closeUpdateFlow = createAction(UpdateOsEvent.CloseUpdateFlow)
export const clearStateAndData = createAction(UpdateOsEvent.ClearStateAndData)
export const cancelDownload = createAction(UpdateOsEvent.CancelDownload)
export const setStateForDownloadedRelease = createAction<{
  version: string
  state: ReleaseProcessState
}>(UpdateOsEvent.SetStateForDownloadedRelease)
export const setStateForInstalledRelease = createAction<{
  version: string
  state: ReleaseProcessState
}>(UpdateOsEvent.SetStateForInstalledRelease)
