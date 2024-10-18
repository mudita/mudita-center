/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { loadDeviceData } from "Core/device"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationEvent } from "Core/device-initialization/constants/event.constant"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { AppError } from "Core/core/errors"
import { DeviceInitializationError } from "Core/device-initialization/constants/errors.enum"
import { loadSettings } from "Core/settings/actions"
import { isActiveDeviceAttachedSelector } from "device-manager/feature"
import { isActiveDeviceProcessingSelector } from "Core/device/selectors/is-active-device-processing.selector"
import { getCrashDump } from "Core/crash-dump"
import { checkForForceUpdateNeed } from "Core/update/actions"
import { getTime } from "Core/time-synchronization/actions/get-time.action"

export const initializeMuditaHarmony = createAsyncThunk<
  DeviceInitializationStatus,
  void,
  { state: ReduxRootState }
>(
  DeviceInitializationEvent.InitializeMuditaHarmony,
  async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initializing)
    )
    await dispatch(loadSettings())
    // Handle LOAD DEVICE DATA as an initializing step
    const result = await dispatch(loadDeviceData(true))

    if ("error" in result) {
      return rejectWithValue(
        new AppError(DeviceInitializationError.InitializingDeviceError)
      )
    }

    await dispatch(getTime())

    const activeDeviceProcessing = isActiveDeviceProcessingSelector(getState())

    if (!activeDeviceProcessing) {
      // Handle FETCH CRASH DUMPS as an initializing step
      await dispatch(getCrashDump())
      await dispatch(checkForForceUpdateNeed())
    }

    if (!isActiveDeviceAttachedSelector(getState())) {
      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Aborted)
      )
      return DeviceInitializationStatus.Aborted
    }

    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )

    return DeviceInitializationStatus.Initialized
  }
)
