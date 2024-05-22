/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setDataMigrationFeatures, setSourceDevice } from "./actions"
import { DeviceId } from "Core/device/constants/device-id"
import { DataMigrationFeature } from "generic-view/models"

interface DataMigrationState {
  sourceDevice?: DeviceId
  selectedFeatures: DataMigrationFeature[]
}

const initialState: DataMigrationState = {
  selectedFeatures: [],
}

export const dataMigrationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSourceDevice, (state, action) => {
    console.log("Setting source device", action.payload)
    state.sourceDevice = action.payload
  })
  builder.addCase(setDataMigrationFeatures, (state, action) => {
    state.selectedFeatures = action.payload
  })
})
