/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { createAction } from "@reduxjs/toolkit"
import { ReleaseProcessState, UpdateOsEvent } from "Core/update/constants"
import { CheckForUpdateState } from "../constants/check-for-update-state.constant"

export const closeForceUpdateFlow = createAction(
  UpdateOsEvent.CloseForceUpdateFlow
)
export const setCheckForUpdateState = createAction<CheckForUpdateState>(
  UpdateOsEvent.SetCheckForUpdateState
)
export const closeUpdateFlow = createAction(UpdateOsEvent.CloseUpdateFlow)
export const cancelDownload = createAction(UpdateOsEvent.CancelDownload)
export const setStateForDownloadedRelease = createAction<{
  version: string
  state: ReleaseProcessState
}>(UpdateOsEvent.SetStateForDownloadedRelease)
export const setStateForInstalledRelease = createAction<{
  version: string
  state: ReleaseProcessState
}>(UpdateOsEvent.SetStateForInstalledRelease)
export const setTmpMuditaHarmonyPortInfo = createAction<PortInfo>(
  UpdateOsEvent.SetTmpMuditaHarmonyPortInfo
)
