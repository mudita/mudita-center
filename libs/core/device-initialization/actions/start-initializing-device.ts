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
import {
  loadDeviceData,
  setOnboardingStatus,
  setUnlockedStatus,
} from "Core/device/actions"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import {
  DeviceCommunicationError,
  DeviceType,
  HarmonyDeviceData,
  KompaktDeviceData,
  OnboardingState,
  PureDeviceData,
} from "Core/device"
import { unlockDeviceStatusRequest } from "Core/device/requests"

const isDataRelativeToCoreDevice = (
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData> | null
): data is PureDeviceData | HarmonyDeviceData => {
  if (data === null) {
    return false
  } else {
    return "onboardingState" in data
  }
}

// TODO: refactor by divides to smaller contexts
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

    // Initializing Mudita Pure Device
    if (activeDevice.deviceType === DeviceType.MuditaPure) {
      // check EULA & PASSCODE
      const data = await unlockDeviceStatusRequest()
      console.log("data: ", data)
      if (!data.ok) {
        const errorType = data.error.type
        if (
          errorType === DeviceCommunicationError.DeviceOnboardingNotFinished
        ) {
          dispatch(setOnboardingStatus(false))
          return
        } else if (errorType === DeviceCommunicationError.DeviceLocked) {
          dispatch(setUnlockedStatus(false))
          return
        }
      }

      await dispatch(loadDeviceData())

      // make sync data
      // make load data

      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )

      history.push(URL_OVERVIEW.root)

      // Initializing Mudita Harmony Device
    } else if (activeDevice.deviceType === DeviceType.MuditaHarmony) {
      await dispatch(loadDeviceData())
      // check EULA & PASSCODE
      const data = deviceDataSelector(getState())
      if (
        isDataRelativeToCoreDevice(data) &&
        data.onboardingState === OnboardingState.InProgress
      ) {
        dispatch(setOnboardingStatus(false))
        return
      }

      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )

      history.push(URL_OVERVIEW.root)

      // skip Initializing for others
    } else {
      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )

      history.push(URL_OVERVIEW.root)
    }
  }
)
