/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { removeDirectory } from "system-utils/feature"

export const clearMigrationData = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(ActionName.ClearMigrationData, async (_, { getState }) => {
  const { dataMigration } = getState()

  if (dataMigration.pureDbTempDirectory) {
    void removeDirectory(dataMigration.pureDbTempDirectory)
  }
})
