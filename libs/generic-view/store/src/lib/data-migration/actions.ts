/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { DataMigrationFeature } from "generic-view/models"
import { DataMigrationStatus, DataTransferProgressLabel } from "./reducer"

export const setSourceDevice = createAction<string | undefined>(
  ActionName.SetDataMigrationSourceDevice
)

export const setDataMigrationFeatures = createAction<DataMigrationFeature[]>(
  ActionName.SetDataMigrationFeatures
)

export const setDataMigrationStatus = createAction<DataMigrationStatus>(
  ActionName.SetDataMigrationStatus
)

export const setTransferProgress = createAction<number | undefined>(
  ActionName.SetDataMigrationTransferProgress
)

export const incrementTransferProgress = createAction<number>(
  ActionName.IncrementDataMigrationTransferProgress
)

export const setTransferProgressLabel = createAction<DataTransferProgressLabel | undefined>(
  ActionName.SetDataMigrationTransferProgressLabel
)
