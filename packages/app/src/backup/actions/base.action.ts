/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"
import { Backup } from "App/backup/reducers"

export const setBackupData = createAction<Backup[]>(BackupEvent.SetBackupData)

