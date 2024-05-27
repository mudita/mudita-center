/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getUnlockStatus, loadDeviceData } from "Core/device"

export const startDataMigrationAction = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(ActionName.StartDataMigration, async (_, { dispatch, getState }) => {
  const { sourceDevice } = getState().dataMigration
  // const unlockStatus = await dispatch(loadDeviceData())
  // console.log(unlockStatus)
})
