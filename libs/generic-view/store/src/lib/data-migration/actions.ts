/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { BaseDevice, DataMigrationFeature } from "generic-view/models"
import { DataMigrationStatus } from "./reducer"

export const setDataMigrationSourceDevice = createAction<
  BaseDevice | undefined
>(ActionName.SetDataMigrationSourceDevice)

export const setDataMigrationFeatures = createAction<DataMigrationFeature[]>(
  ActionName.SetDataMigrationFeatures
)

export const setDataMigrationStatus = createAction<DataMigrationStatus>(
  ActionName.SetDataMigrationStatus
)

export const addDataMigrationAbortController = createAction<AbortController>(
  ActionName.AddDataMigrationAbortController
)

export const clearDataMigrationAbortControllers = createAction(
  ActionName.ClearDataMigrationAbortControllers
)

export const setDataMigrationPureDbTempDirectory = createAction<
  string | undefined
>(ActionName.SetDataMigrationPureDbTempDirectory)

export const setDataMigrationPureRestarting = createAction<boolean>(
  ActionName.SetDataMigrationPureRestarting
)

export const setDataMigrationPureBusy = createAction<
  BaseDevice["serialNumber"] | undefined
>(ActionName.SetDataMigrationPureBusy)
