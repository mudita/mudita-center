/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceCommunicationError, DeviceEvent } from "Core/device/constants"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getOnboardingStatus = createAsyncThunk<
  boolean,
  void,
  { state: ReduxRootState }
>(DeviceEvent.GetOnboardingStatus, async () => {
  const unlockDeviceStatusResult = await unlockDeviceStatusRequest()

  if (!unlockDeviceStatusResult.ok) {
    return (
      unlockDeviceStatusResult.error.type !==
      DeviceCommunicationError.DeviceOnboardingNotFinished
    )
  }

  return true
})
