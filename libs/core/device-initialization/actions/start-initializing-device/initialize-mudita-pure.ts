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
  setOnboardingStatus,
  setUnlockedStatus,
} from "Core/device"
import { deviceDataSelector } from "Core/device/selectors/device-data.selector"
import { isPureDeviceData } from "Core/device/helpers/is-pure-device-data"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
import { loadIndexRequest } from "Core/index-storage/requests"
import {
  readAllIndexes,
  setDataSyncSetStatus,
  updateAllIndexes,
} from "Core/data-sync/actions"
import { SynchronizationStatus } from "Core/data-sync/reducers"

const corruptedPureOSVersions = ["1.5.1"]

export const initializeMuditaPure = async (
  history: History,
  dispatch: ThunkDispatch<ReduxRootState, unknown, Action<unknown>>,
  getState: () => ReduxRootState
): Promise<void> => {
  // check EULA & PASSCODE
  const data = await unlockDeviceStatusRequest()
  console.log("initializeMuditaPure:unlockDeviceStatusRequest:data: ", data)
  if (!data.ok) {
    const errorType = data.error.type
    // check EULA
    if (errorType === DeviceCommunicationError.DeviceOnboardingNotFinished) {
      dispatch(setOnboardingStatus(false))
      return
      // check PASSCODE
    } else if (errorType === DeviceCommunicationError.DeviceLocked) {
      dispatch(setUnlockedStatus(false))
      return
    }
  }

  // make load data
  // TODO: load device error handle
  const loadDeviceDataResult = await dispatch(loadDeviceData())
  console.log(
    "initializeMuditaPure:sync:loadDeviceDataResult: ",
    loadDeviceDataResult
  )
  // make sync data
  const deviceData = deviceDataSelector(getState())

  if (!isPureDeviceData(deviceData)) {
    return
  }

  const { osVersion, serialNumber, token } = deviceData

  const baseVersion = String(osVersion).split("-")[0]
  // skip data sync when os corrupted
  if (corruptedPureOSVersions.some((v) => v === baseVersion)) {
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )

    history.push(URL_OVERVIEW.root)
    return
  }

  const restored = await loadIndexRequest({ serialNumber, token })
  console.log("data:sync:restored: ", restored)
  if (restored) {
    await dispatch(readAllIndexes())
    dispatch(setDataSyncSetStatus(SynchronizationStatus.Cache))
    dispatch(updateAllIndexes())
  } else {
    // TODO: data sync error handle
    const updateAllIndexesResult = await dispatch(updateAllIndexes())
    console.log(
      "initializeMuditaPure:sync:updateAllIndexesResult: ",
      updateAllIndexesResult
    )
  }

  dispatch(
    setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
  )

  history.push(URL_OVERVIEW.root)
}
