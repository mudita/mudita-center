/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { ReleaseProcessState, UpdateOsEvent } from "App/update/constants"

export const setUpdateState = createAction<State>(UpdateOsEvent.SetUpdateState)
export const clearState = createAction(UpdateOsEvent.ClearState)
export const cancelDownload = createAction(UpdateOsEvent.CancelDownload)
export const setStateForDownloadedRelease = createAction<{
  version: string
  state: ReleaseProcessState
}>(UpdateOsEvent.SetStateForDownloadedRelease)
export const setStateForInstalledRelease = createAction<{
  version: string
  state: ReleaseProcessState
}>(UpdateOsEvent.SetStateForInstalledRelease)
