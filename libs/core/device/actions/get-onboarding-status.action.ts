/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  DeviceCommunicationError,
  DeviceEvent,
  DeviceType,
  OnboardingState,
} from "Core/device/constants"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { getDeviceInfoRequest } from "Core/device-info/requests"

export const getOnboardingStatus = createAsyncThunk<
  boolean,
  void,
  { state: ReduxRootState }
>(DeviceEvent.GetOnboardingStatus, async (_, { getState }) => {
  const activeDevice = getActiveDevice(getState())

  if (activeDevice) {
    const { deviceType } = activeDevice

    if (deviceType === DeviceType.MuditaPure) {
      const { ok, error } = await unlockDeviceStatusRequest()
      return (
        ok ||
        error?.type === DeviceCommunicationError.DeviceOnboardingNotFinished
      )
    } else if (deviceType === DeviceType.MuditaHarmony) {
      const { ok, data } = await getDeviceInfoRequest()
      return ok && data.onboardingState === OnboardingState.Finished
    }
  }

  return true
})
