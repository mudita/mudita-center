/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { Action } from "redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import {
  DeviceCommunicationError,
  loadDeviceData,
  PureDeviceData,
  setCriticalBatteryLevelStatus,
  setOnboardingStatus,
  setUnlockedStatus,
} from "Core/device"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import {
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { loadIndexRequest } from "Core/index-storage/requests"
import {
  readAllIndexes,
  setDataSyncSetStatus,
  updateAllIndexes,
} from "Core/data-sync/actions"
import { SynchronizationStatus } from "Core/data-sync/reducers"
import { getCrashDump } from "Core/crash-dump/actions"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { shouldSkipDataSync } from "Core/device-initialization/actions/start-initializing-device/should-skip-data-sync.helper"
import { configureDevice } from "Core/device-manager/actions/configure-device.action"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"
import { loadBackupData } from "Core/backup"
import { checkForForceUpdateNeed } from "Core/update/actions"
import { loadSettings } from "Core/settings/actions"
import { isActiveDeviceAttachedSelector } from "Core/device-manager/selectors/is-active-device-attached.selector"

export const initializeMuditaPure = async (
  history: History,
  dispatch: ThunkDispatch<ReduxRootState, unknown, Action<unknown>>,
  getState: () => ReduxRootState
): Promise<void> => {
  await dispatch(loadSettings())

  const unlockDeviceStatusResult = await unlockDeviceStatusRequest()

  if (!unlockDeviceStatusResult.ok) {
    const errorType = unlockDeviceStatusResult.error.type

    // Handle Battery Critical Level as an initializing step
    if (errorType === DeviceCommunicationError.BatteryCriticalLevel) {
      dispatch(setCriticalBatteryLevelStatus(true))
      return
    }

    // Handle EULA as an initializing step
    if (errorType === DeviceCommunicationError.DeviceOnboardingNotFinished) {
      dispatch(setOnboardingStatus(false))
      return
    }

    // Handle PASSCODE as an initializing step
    if (errorType === DeviceCommunicationError.DeviceLocked) {
      dispatch(setUnlockedStatus(false))
      return
    }
  }

  await dispatch(configureDevice(activeDeviceIdSelector(getState()) as string))

  // Handle LOAD DEVICE DATA as an initializing step
  const loadDeviceDataResult = await dispatch(loadDeviceData(true))

  if ("error" in loadDeviceDataResult) {
    history.push(URL_ONBOARDING.troubleshooting)
    return
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
        history.push(URL_ONBOARDING.troubleshooting)
        return
      }
    }
  }

  await dispatch(loadBackupData())

  if(!isActiveDeviceAttachedSelector(getState())){
    return
  }

  dispatch(
    setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
  )

  history.push(URL_OVERVIEW.root)
}
