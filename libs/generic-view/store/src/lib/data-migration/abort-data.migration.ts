/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataMigrationStatus } from "./reducer"
import {
  setDataMigrationAbort,
  setDataMigrationProgress,
  setDataMigrationStatus,
} from "./actions"
import { DataMigrationPercentageProgress } from "./perform-data.migration"

export const abortDataMigration = createAsyncThunk<
  void,
  { reason?: Extract<DataMigrationStatus, "CANCELLED" | "FAILED"> } | undefined,
  { state: ReduxRootState }
>(
  ActionName.AbortDataMigration,
  async ({ reason } = {}, { dispatch, getState }) => {
    const { dataMigration } = getState()

    dataMigration.abortController?.abort?.()
    dispatch(setDataMigrationAbort(undefined))
    dispatch(setDataMigrationProgress(DataMigrationPercentageProgress.None))

    if (reason) {
      dispatch(setDataMigrationStatus(reason))
    }

    return
  }
)
