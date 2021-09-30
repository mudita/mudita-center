/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"

export const loadBackupData = createAsyncThunk<any, any>(
  BackupEvent.Load,
  async (payload) => {
    return payload
  }
)
