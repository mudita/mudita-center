/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setDataMigrationFeatures,
  setDataMigrationStatus,
  setSourceDevice,
} from "./actions"
import { DeviceId } from "Core/device/constants/device-id"
import { DataMigrationFeature } from "generic-view/models"

export type DataMigrationStatus =
  | "idle"
  | "pure-password-required"
  | "pure-critical-battery"
  | "pure-onboarding-required"
  | "pure-update-required"
  | "pure-connection-failed"
  | "in-progress"

interface DataMigrationState {
  sourceDevice?: DeviceId
  selectedFeatures: DataMigrationFeature[]
  status: DataMigrationStatus
}

const initialState: DataMigrationState = {
  selectedFeatures: [],
  status: "idle",
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
})
