/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  resetDataMigration,
  setDataMigrationFeatures,
  setSourceDevice,
  setTargetDevice,
} from "./actions"
import { DeviceId } from "Core/device/constants/device-id"
import { DataMigrationFeature } from "generic-view/models"
import { detachDevice } from "../views/actions"

interface DataMigrationState {
  sourceDevice?: DeviceId
  targetDevice?: DeviceId
  selectedFeatures: DataMigrationFeature[]
}

const initialState: DataMigrationState = {
  selectedFeatures: [],
}

export const dataMigrationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSourceDevice, (state, action) => {
    state.sourceDevice = action.payload
  })
  builder.addCase(setTargetDevice, (state, action) => {
    state.targetDevice = action.payload
  })
  builder.addCase(setDataMigrationFeatures, (state, action) => {
    state.selectedFeatures = action.payload
  })
  builder.addCase(resetDataMigration, (state) => {
    state.sourceDevice = undefined
    state.targetDevice = undefined
  })
  builder.addCase(detachDevice, (state, action) => {
    if (state.sourceDevice === action.payload.deviceId) {
      state.sourceDevice = undefined
    }
    if (state.targetDevice === action.payload.deviceId) {
      state.targetDevice = undefined
    }
  })
})
