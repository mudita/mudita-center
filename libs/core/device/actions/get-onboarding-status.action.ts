/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceCommunicationError } from "core-device/models"
import { DeviceEvent } from "Core/device/constants"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getActiveDevice } from "device-manager/feature"

export const getOnboardingStatus = createAsyncThunk<
  boolean,
  void,
  { state: ReduxRootState }
>(DeviceEvent.GetOnboardingStatus, async (_, { getState }) => {
  const activeDevice = getActiveDevice(getState())

  if (activeDevice) {
    const { ok, error } = await unlockDeviceStatusRequest()
    return (
      ok || error?.type !== DeviceCommunicationError.DeviceOnboardingNotFinished
    )
  }

  return true
})
