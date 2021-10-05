/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackupDeviceEvent } from "App/backup-device/constants"


export const startBackupDevice = createAsyncThunk<any, any>(
  BackupDeviceEvent.StartBackupDevice,
  async (payload) => {
    return payload
  }
)
