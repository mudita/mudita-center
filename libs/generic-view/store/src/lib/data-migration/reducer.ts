/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setDataMigrationAbort,
  setDataMigrationFeatures,
  setDataMigrationStatus,
  setSourceDevice,
  setDataMigrationProgress,
} from "./actions"
import { DeviceId } from "Core/device/constants/device-id"
import { DataMigrationFeature } from "generic-view/models"

export type DataMigrationStatus =
  | "IDLE"
  | "PURE-PASSWORD-REQUIRED"
  | "PURE-CRITICAL-BATTERY"
  | "PURE-ONBOARDING-REQUIRED"
  | "PURE-UPDATE-REQUIRED"
  | "PURE-CONNECTION-FAILED"
  | "IN-PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"

interface DataMigrationState {
  sourceDevice?: DeviceId
  selectedFeatures: DataMigrationFeature[]
  status: DataMigrationStatus
  transferProgress: number
  abortController?: AbortController
}

const initialState: DataMigrationState = {
  selectedFeatures: [],
  status: "IDLE",
  transferProgress: 0,
}

export const dataMigrationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSourceDevice, (state, action) => {
    state.sourceDevice = action.payload
  })
  builder.addCase(setDataMigrationFeatures, (state, action) => {
    state.selectedFeatures = action.payload
  })
  builder.addCase(setDataMigrationStatus, (state, action) => {
    state.status = action.payload
  })
  builder.addCase(setDataMigrationProgress, (state, action) => {
    state.transferProgress = action.payload ?? 0
  })
  builder.addCase(setDataMigrationAbort, (state, action) => {
    state.abortController = action.payload
  })
  // builder.addCase(detachDevice, (state, action) => {
  //   if (action.payload.deviceId === state.sourceDevice) {
  //     state.sourceDevice = undefined
  //   }
  // })
})
