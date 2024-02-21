/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { Backup } from "./reducer"
import { ActionName } from "../action-names"

export const setBackupFiles = createAction<Backup[]>(ActionName.AddBackupFiles)

