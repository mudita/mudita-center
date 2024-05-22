/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { DataMigrationFeature } from "generic-view/models"

export const setSourceDevice = createAction<string | undefined>(
  ActionName.SetDataMigrationSourceDevice
)

export const setTargetDevice = createAction<string | undefined>(
  ActionName.SetDataMigrationTargetDevice
)

export const setDataMigrationFeatures = createAction<DataMigrationFeature[]>(
  ActionName.SetDataMigrationFeatures
)

export const resetDataMigration = createAction(ActionName.ResetDataMigration)
