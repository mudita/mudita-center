/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceCommunicationError } from "core-device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { versionFormatter } from "Core/update/helpers"
import isVersionGreaterOrEqual from "Core/utils/is-version-greater-or-equal"
import { ActionName } from "../action-names"
import { setDataMigrationStatus } from "./actions"

export const startDataMigration = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(ActionName.StartDataMigration, async (_, { dispatch, getState }) => {
  const { dataMigration, settings } = getState()

  const { error } = await unlockDeviceStatusRequest(dataMigration.sourceDevice)
  if (error) {
    switch (error.type) {
      case DeviceCommunicationError.DeviceLocked:
        dispatch(setDataMigrationStatus("PURE-PASSWORD-REQUIRED"))
        return
      case DeviceCommunicationError.BatteryCriticalLevel:
        dispatch(setDataMigrationStatus("PURE-CRITICAL-BATTERY"))
        return
      case DeviceCommunicationError.DeviceOnboardingNotFinished:
        dispatch(setDataMigrationStatus("PURE-ONBOARDING-REQUIRED"))
        return
      default:
        dispatch(setDataMigrationStatus("PURE-CONNECTION-FAILED"))
        return
    }
  }

  const deviceInfo = await getDeviceInfoRequest(dataMigration.sourceDevice)

  if (deviceInfo.ok) {
    const osVersion = versionFormatter(deviceInfo.data.osVersion)
    const lowestSupportedProductVersion =
      settings.lowestSupportedVersions?.lowestSupportedProductVersion

    if (!osVersion || !lowestSupportedProductVersion) {
      dispatch(setDataMigrationStatus("IN-PROGRESS"))
      return
    }

    const osVersionSupported = isVersionGreaterOrEqual(
      osVersion,
      lowestSupportedProductVersion["MuditaPure"]
    )
    if (!osVersionSupported) {
      dispatch(setDataMigrationStatus("PURE-UPDATE-REQUIRED"))
      return
    }

    dispatch(setDataMigrationStatus("IN-PROGRESS"))
  } else {
    dispatch(setDataMigrationStatus("PURE-CONNECTION-FAILED"))
  }
})
