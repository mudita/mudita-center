/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  addDataMigrationAbortController,
  clearDataMigrationAbortControllers,
  setDataMigrationFeatures,
  setDataMigrationPureBusy,
  setDataMigrationPureDbTempDirectory,
  setDataMigrationPureRestarting,
  setDataMigrationSourceDevice,
  setDataMigrationStatus,
} from "./actions"
import { BaseDevice, DataMigrationFeature } from "generic-view/models"

export enum DataMigrationStatus {
  Idle = "IDLE",
  PurePasswordRequired = "PURE-PASSWORD-REQUIRED",
  PureCriticalBattery = "PURE-CRITICAL-BATTERY",
  PureOnboardingRequired = "PURE-ONBOARDING-REQUIRED",
  PureUpdateRequired = "PURE-UPDATE-REQUIRED",
  PureConnectionFailed = "PURE-CONNECTION-FAILED",
  PureDatabaseCreating = "PURE-DB-CREATING",
  PureDatabaseIndexing = "PURE-DB-INDEXING",
  DataTransferring = "DATA-TRANSFERRING",
  DataTransferred = "DATA-TRANSFERRED",
  Completed = "COMPLETED",
  Failed = "FAILED",
  Cancelled = "CANCELLED",
}

interface DataMigrationState {
  sourceDevice?: BaseDevice
  selectedFeatures: DataMigrationFeature[]
  status: DataMigrationStatus
  abortControllers: AbortController[]
  pureDbTempDirectory?: string
  pureRestarting?: boolean
  pureBusy?: BaseDevice["serialNumber"]
}

const initialState: DataMigrationState = {
  selectedFeatures: [],
  status: DataMigrationStatus.Idle,
  abortControllers: [],
}

export const dataMigrationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDataMigrationSourceDevice, (state, action) => {
    state.sourceDevice = action.payload
  })
  builder.addCase(setDataMigrationFeatures, (state, action) => {
    state.selectedFeatures = action.payload
  })
  builder.addCase(setDataMigrationStatus, (state, action) => {
    state.status = action.payload
  })
  builder.addCase(addDataMigrationAbortController, (state, action) => {
    state.abortControllers = [...state.abortControllers, action.payload]
  })
  builder.addCase(clearDataMigrationAbortControllers, (state) => {
    state.abortControllers = []
  })
  builder.addCase(setDataMigrationPureDbTempDirectory, (state, action) => {
    state.pureDbTempDirectory = action.payload
  })
  builder.addCase(setDataMigrationPureRestarting, (state, action) => {
    state.pureRestarting = action.payload
  })
  builder.addCase(setDataMigrationPureBusy, (state, action) => {
    state.pureBusy = action.payload
  })
})
