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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatchWithDeviceCheck = async (action: any): Promise<any> => {
      if (!isActiveDeviceAttachedSelector(getState())) {
        dispatch(
          setDeviceInitializationStatus(DeviceInitializationStatus.Aborted)
        )
        throw new AppError(DeviceInitializationError.ActiveDeviceNotAttached)
      }
      return dispatch(action)
    }

    try {
      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initializing)
      )
      await dispatchWithDeviceCheck(loadSettings())

      const unlockStatus = await dispatchWithDeviceCheck(getUnlockStatus())
      if (!unlockStatus.payload) {
        return DeviceInitializationStatus.Initializing
      }

      await dispatchWithDeviceCheck(
        configureDevice(activeDeviceIdSelector(getState()) as string)
      )

      // Handle LOAD DEVICE DATA as an initializing step
      const loadDeviceDataResult = await dispatchWithDeviceCheck(
        loadDeviceData(true)
      )
      if ("error" in loadDeviceDataResult) {
        return rejectWithValue(
          new AppError(DeviceInitializationError.InitializingDeviceError)
        )
      }

      const activeDeviceProcessing = isActiveDeviceProcessingSelector(
        getState()
      )

      if (!activeDeviceProcessing) {
        // Handle FETCH CRASH DUMPS as an initializing step
        await dispatchWithDeviceCheck(getCrashDump())
        await dispatchWithDeviceCheck(checkForForceUpdateNeed())
      }

      // Handle SYNC DATA as an initializing step
      const deviceData = deviceDataSelector(getState()) as PureDeviceData
      const skipDataSync = shouldSkipDataSync(deviceData)

      if (!activeDeviceProcessing && !skipDataSync) {
        const { serialNumber, token } = deviceData

        const restored = await loadIndexRequest({ serialNumber, token })

        if (restored) {
          await dispatchWithDeviceCheck(readAllIndexes())
          await dispatchWithDeviceCheck(
            setDataSyncSetStatus(SynchronizationStatus.Cache)
          )
          await dispatchWithDeviceCheck(updateAllIndexes())
        } else {
          const updateAllIndexesResult = await dispatchWithDeviceCheck(
            updateAllIndexes()
          )
          if ("error" in updateAllIndexesResult) {
            return rejectWithValue(
              new AppError(DeviceInitializationError.InitializingDeviceError)
            )
          }
        }
      }

      await dispatchWithDeviceCheck(loadBackupData())

      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )
      return DeviceInitializationStatus.Initialized
    } catch (error) {
      if (
        error instanceof AppError &&
        error.type === DeviceInitializationError.ActiveDeviceNotAttached
      ) {
        return DeviceInitializationStatus.Aborted
      }
      return rejectWithValue(error)
    }
  }
)
