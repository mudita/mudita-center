/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationEvent } from "Core/device-initialization/constants/event.constant"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
import { loadDeviceData, setOnboardingStatus } from "Core/device/actions"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import {
  HarmonyDeviceData,
  KompaktDeviceData,
  OnboardingState,
  PureDeviceData,
} from "Core/device"

const isDataRelativeToCoreDevice = (
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData> | null
): data is PureDeviceData | HarmonyDeviceData => {
  if (data === null) {
    return false
  } else {
    return "onboardingState" in data
  }
}

export const startInitializingDevice = createAsyncThunk<
  void,
  History,
  { state: ReduxRootState }
>(
  DeviceInitializationEvent.StartInitializingDevice,
  async (history, { dispatch, getState }) => {
    const activeDevice = getActiveDevice(getState())
    if (activeDevice == undefined) {
      // TODO: handle active device as undefined
      return
    }

    if (activeDevice.initializationOptions.data) {
      // TODO: handle when load data throw error
      await dispatch(loadDeviceData())
    }

    if (activeDevice.initializationOptions.eula) {
      const data = deviceDataSelector(getState())
      if (
        isDataRelativeToCoreDevice(data) &&
        data.onboardingState === OnboardingState.InProgress
      ) {
        dispatch(setOnboardingStatus(false))
        return
      }
    }

    if (activeDevice.initializationOptions.sync) {
      return
    }
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )

    history.push(URL_OVERVIEW.root)
  }
)
