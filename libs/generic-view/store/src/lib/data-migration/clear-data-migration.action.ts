/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  setDataMigrationFeatures,
  setDataMigrationStatus,
  setSourceDevice,
} from "./actions"

export const clearDataMigrationDevice = createAsyncThunk<
  void,
  DeviceId,
  { state: ReduxRootState }
>(ActionName.ClearDataMigrationDevice, (deviceId, { dispatch, getState }) => {
  const { sourceDevice } = getState().dataMigration
  if (sourceDevice && sourceDevice === deviceId) {
    dispatch(setSourceDevice(undefined))
    dispatch(setDataMigrationFeatures([]))
    dispatch(setDataMigrationStatus("idle"))
  }
})
