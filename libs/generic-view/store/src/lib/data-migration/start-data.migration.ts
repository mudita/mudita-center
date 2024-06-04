/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceCommunicationError } from "Core/device"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { setDataMigrationStatus } from "./actions"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { versionFormatter } from "Core/update/helpers"
import isVersionGreaterOrEqual from "Core/utils/is-version-greater-or-equal"

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
        dispatch(setDataMigrationStatus("pure-password-required"))
        return
      case DeviceCommunicationError.BatteryCriticalLevel:
        dispatch(setDataMigrationStatus("pure-critical-battery"))
        return
      case DeviceCommunicationError.DeviceOnboardingNotFinished:
        dispatch(setDataMigrationStatus("pure-onboarding-required"))
        return
      default:
        dispatch(setDataMigrationStatus("pure-connection-failed"))
        return
    }
  }

  const deviceInfo = await getDeviceInfoRequest(dataMigration.sourceDevice)

  if (deviceInfo.ok) {
    const osVersion = versionFormatter(deviceInfo.data.osVersion)
    const lowestSupportedProductVersion =
      settings.lowestSupportedVersions?.lowestSupportedProductVersion

    if (!osVersion || !lowestSupportedProductVersion) {
      dispatch(setDataMigrationStatus("in-progress"))
      return
    }

    const osVersionSupported = isVersionGreaterOrEqual(
      osVersion,
      lowestSupportedProductVersion["MuditaPure"]
    )
    if (!osVersionSupported) {
      dispatch(setDataMigrationStatus("pure-update-required"))
      return
    }

    dispatch(setDataMigrationStatus("in-progress"))
  } else {
    dispatch(setDataMigrationStatus("pure-connection-failed"))
  }
})
