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
import { DataMigrationStatus } from "./reducer"

export const prepareDevicesForDataMigration = createAsyncThunk<
  void,
  { onSuccess: VoidFunction },
  { state: ReduxRootState }
>(
  ActionName.PrepareDataMigrationDevices,
  async ({ onSuccess }, { dispatch, getState }) => {
    const { dataMigration, settings } = getState()

    const { error } = await unlockDeviceStatusRequest(
      dataMigration.sourceDevice?.serialNumber
    )

    if (error) {
      switch (error.type) {
        case DeviceCommunicationError.DeviceLocked:
          dispatch(
            setDataMigrationStatus(DataMigrationStatus.PurePasswordRequired)
          )
          return
        case DeviceCommunicationError.BatteryCriticalLevel:
          dispatch(
            setDataMigrationStatus(DataMigrationStatus.PureCriticalBattery)
          )
          return
        case DeviceCommunicationError.DeviceOnboardingNotFinished:
          dispatch(
            setDataMigrationStatus(DataMigrationStatus.PureOnboardingRequired)
          )
          return
        default:
          dispatch(
            setDataMigrationStatus(DataMigrationStatus.PureConnectionFailed)
          )
          return
      }
    }

    const deviceInfo = await getDeviceInfoRequest(
      dataMigration.sourceDevice?.serialNumber
    )

    if (deviceInfo.ok) {
      const osVersion = versionFormatter(deviceInfo.data.osVersion)
      const lowestSupportedProductVersion =
        settings.lowestSupportedVersions?.lowestSupportedProductVersion

      if (!osVersion || !lowestSupportedProductVersion) {
        onSuccess()
        return
      }

      const osVersionSupported = isVersionGreaterOrEqual(
        osVersion,
        lowestSupportedProductVersion["MuditaPure"]
      )
      if (!osVersionSupported) {
        dispatch(setDataMigrationStatus(DataMigrationStatus.PureUpdateRequired))
        return
      }

      onSuccess()
    } else {
      dispatch(setDataMigrationStatus(DataMigrationStatus.PureConnectionFailed))
    }
  }
)
