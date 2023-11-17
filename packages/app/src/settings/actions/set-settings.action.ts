/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setBackupData } from "App/backup/actions/base.action"
import { BackupError, BackupEvent } from "App/backup/constants"
import { AppError } from "App/core/errors"
import { loadBackupsRequest } from "App/backup/requests/load-backups.request"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { createAction } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { SettingsState } from "App/settings/reducers"

export const setSettings = createAction<
  Partial<
    Omit<
      SettingsState,
      "loaded" | "loading" | "updateAvailable" | "latestVersion"
    >
  >
>(SettingsEvent.SetSettings)
