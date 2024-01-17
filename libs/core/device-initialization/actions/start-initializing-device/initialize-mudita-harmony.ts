/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { Action } from "redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  loadDeviceData,
  OnboardingState,
  setOnboardingStatus,
} from "Core/device"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import {
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { isHarmonyDeviceData } from "Core/device/helpers/is-harmony-device-data"
import { getCrashDump } from "Core/crash-dump"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { checkForForceUpdateNeed } from "Core/update/actions"
import { loadSettings } from "Core/settings/actions"

export const initializeMuditaHarmony = async (
  history: History,
  dispatch: ThunkDispatch<ReduxRootState, unknown, Action<unknown>>,
  getState: () => ReduxRootState
): Promise<void> => {
  await dispatch(loadSettings())
  // Handle LOAD DEVICE DATA as an initializing step
  const result = await dispatch(loadDeviceData(true))

  if ("error" in result) {
    history.push(URL_ONBOARDING.troubleshooting)
    return
  }

  // Handle EULA as an initializing step
  const data = deviceDataSelector(getState())
  if (
    isHarmonyDeviceData(data) &&
    data.onboardingState === OnboardingState.InProgress
  ) {
    dispatch(setOnboardingStatus(false))
    return
  }

  const activeDeviceProcessing = isActiveDeviceProcessingSelector(getState())

  if (!activeDeviceProcessing) {
    // Handle FETCH CRASH DUMPS as an initializing step
    await dispatch(getCrashDump())
    await dispatch(checkForForceUpdateNeed())
  }

  dispatch(
    setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
  )

  history.push(URL_OVERVIEW.root)
}
