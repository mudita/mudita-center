/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { DataMigrationFeature } from "generic-view/models"
import { DataMigrationStatus } from "./reducer"
import { DataMigrationPercentageProgress } from "./perform-data.migration"

export const setSourceDevice = createAction<string | undefined>(
  ActionName.SetDataMigrationSourceDevice
)

export const setDataMigrationFeatures = createAction<DataMigrationFeature[]>(
  ActionName.SetDataMigrationFeatures
)

export const setDataMigrationStatus = createAction<DataMigrationStatus>(
  ActionName.SetDataMigrationStatus
)

export const setDataMigrationProgress =
  createAction<DataMigrationPercentageProgress>(
    ActionName.SetDataMigrationTransferProgress
  )

export const setDataMigrationAbort = createAction<AbortController | undefined>(
  ActionName.SetDataMigrationAbort
)

export const setDataMigrationPureDbIndexing = createAction<boolean>(
  ActionName.setDataMigrationPureDbIndexing
)
