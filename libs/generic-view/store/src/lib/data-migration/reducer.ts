/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setTransferProgressLabel,
  setDataMigrationFeatures,
  setDataMigrationStatus,
  setSourceDevice,
  setTransferProgress,
  incrementTransferProgress,
} from "./actions"
import { DeviceId } from "Core/device/constants/device-id"
import {
  DataMigrationFeature,
  DataMigrationProgressStep,
} from "generic-view/models"

export type DataMigrationStatus =
  | "idle"
  | "pure-password-required"
  | "pure-critical-battery"
  | "pure-onboarding-required"
  | "pure-update-required"
  | "pure-connection-failed"
  | "in-progress"

export type DataTransferProgressLabel =
  | DataMigrationFeature
  | DataMigrationProgressStep

interface DataMigrationState {
  sourceDevice?: DeviceId
  selectedFeatures: DataMigrationFeature[]
  status: DataMigrationStatus
  transferProgress: number
  transferProgressLabel?: DataTransferProgressLabel
}

const initialState: DataMigrationState = {
  selectedFeatures: [],
  status: "idle",
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
  builder.addCase(setTransferProgress, (state, action) => {
    state.transferProgress = action.payload ?? 0
  })
  builder.addCase(incrementTransferProgress, (state, action) => {
    state.transferProgress += action.payload
  })
  builder.addCase(setTransferProgressLabel, (state, action) => {
    state.transferProgressLabel = action.payload
  })
})
