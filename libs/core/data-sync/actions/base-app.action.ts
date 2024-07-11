/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DataSyncEvent } from "Core/data-sync/constants"
import { SynchronizationStatus } from "Core/data-sync/reducers"

export const setDataSyncSetStatus = createAction<SynchronizationStatus>(
  DataSyncEvent.SetDataSyncSetStatus
)
