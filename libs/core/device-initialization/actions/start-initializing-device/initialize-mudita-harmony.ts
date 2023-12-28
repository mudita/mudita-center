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
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
import { isHarmonyDeviceData } from "Core/device/helpers/is-harmony-device-data"
import { getCrashDump } from "Core/crash-dump"

export const initializeMuditaHarmony = async (
  history: History,
  dispatch: ThunkDispatch<ReduxRootState, unknown, Action<unknown>>,
  getState: () => ReduxRootState
): Promise<void> => {
  await dispatch(loadDeviceData(true))
  // check EULA
  const data = deviceDataSelector(getState())
  if (
    isHarmonyDeviceData(data) &&
    data.onboardingState === OnboardingState.InProgress
  ) {
    dispatch(setOnboardingStatus(false))
    return
  }

  // fetch crash dumps state
  await dispatch(getCrashDump())

  dispatch(
    setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
  )

  history.push(URL_OVERVIEW.root)
}
