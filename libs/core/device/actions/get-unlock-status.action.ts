/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setLockTime } from "Core/device/actions/base.action"
import { getLeftTimeSelector } from "Core/device/selectors"
import { handleCommunicationError } from "Core/device/actions/handle-communication-error.action"

export const getUnlockStatus = createAsyncThunk<
  boolean,
  void,
  { state: ReduxRootState }
>(DeviceEvent.GetUnlockedStatus, async (_, { dispatch, getState }) => {
  const { ok, error } = await unlockDeviceStatusRequest()
  const leftTime = getLeftTimeSelector(getState())

  if (ok && leftTime !== undefined) {
    dispatch(setLockTime(undefined))
  }

  if (error) {
    await dispatch(handleCommunicationError(error))
  }

  return ok
})
