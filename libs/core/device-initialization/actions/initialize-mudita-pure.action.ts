/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUnlockStatus, loadDeviceData, PureDeviceData } from "Core/device"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationEvent } from "Core/device-initialization/constants/event.constant"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { AppError } from "Core/core/errors"
import { DeviceInitializationError } from "Core/device-initialization/constants/errors.enum"
import { loadSettings } from "Core/settings/actions"
import { configureDevice } from "Core/device-manager/actions/configure-device.action"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { getCrashDump } from "Core/crash-dump"
import { checkForForceUpdateNeed } from "Core/update/actions"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { shouldSkipDataSync } from "Core/device-initialization/actions/should-skip-data-sync.helper"
import { loadIndexRequest } from "Core/index-storage/requests"
import {
  readAllIndexes,
  setDataSyncSetStatus,
  updateAllIndexes,
} from "Core/data-sync/actions"
import { SynchronizationStatus } from "Core/data-sync/reducers"
import { loadBackupData } from "Core/backup"
import { isActiveDeviceAttachedSelector } from "Core/device-manager/selectors/is-active-device-attached.selector"

export const initializeMuditaPure = createAsyncThunk<
  DeviceInitializationStatus,
  void,
  { state: ReduxRootState }
>(
  DeviceInitializationEvent.InitializeMuditaPure,
  async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initializing)
    )
    await dispatch(loadSettings())

    const unlockStatus = await dispatch(getUnlockStatus())
    if (!unlockStatus.payload) {
      return DeviceInitializationStatus.Initializing
    }

    await dispatch(
      configureDevice(activeDeviceIdSelector(getState()) as string)
    )

    // Handle LOAD DEVICE DATA as an initializing step
    const loadDeviceDataResult = await dispatch(loadDeviceData(true))

    if ("error" in loadDeviceDataResult) {
      return rejectWithValue(
        new AppError(DeviceInitializationError.InitializingDeviceError)
      )
    }

    const activeDeviceProcessing = isActiveDeviceProcessingSelector(getState())

    if (!activeDeviceProcessing) {
      // Handle FETCH CRASH DUMPS as an initializing step
      await dispatch(getCrashDump())
      await dispatch(checkForForceUpdateNeed())
    }

    // Handle SYNC DATA as an initializing step
    const deviceData = deviceDataSelector(getState()) as PureDeviceData
    const skipDataSync = shouldSkipDataSync(deviceData)

    if (!activeDeviceProcessing && !skipDataSync) {
      const { serialNumber, token } = deviceData

      const restored = await loadIndexRequest({ serialNumber, token })

      if (restored) {
        await dispatch(readAllIndexes())
        dispatch(setDataSyncSetStatus(SynchronizationStatus.Cache))
        dispatch(updateAllIndexes())
      } else {
        const updateAllIndexesResult = await dispatch(updateAllIndexes())
        if ("error" in updateAllIndexesResult) {
          return rejectWithValue(
            new AppError(DeviceInitializationError.InitializingDeviceError)
          )
        }
      }
    }

    await dispatch(loadBackupData())

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
