/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataMigrationStatus } from "./reducer"
import {
  clearDataMigrationAbortControllers,
  setDataMigrationStatus,
} from "./actions"
import { clearMigrationData } from "./clear-migration-data"

export const abortDataMigration = createAsyncThunk<
  void,
  | { reason?: DataMigrationStatus.Cancelled | DataMigrationStatus.Failed }
  | undefined,
  { state: ReduxRootState }
>(
  ActionName.AbortDataMigration,
  async ({ reason } = {}, { dispatch, getState }) => {
    const { dataMigration } = getState()
    dataMigration.abortControllers.forEach((controller) => {
      controller.abort()
    })
    dispatch(clearDataMigrationAbortControllers())
    dispatch(clearMigrationData())

    if (reason) {
      dispatch(setDataMigrationStatus(reason))
    }

    return
  }
)
