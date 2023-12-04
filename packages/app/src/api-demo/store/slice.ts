/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer, createSlice } from "@reduxjs/toolkit"
import { generateOverviewLayout } from "../output/overview-output"
import { overviewConfig } from "../input/input-config"
import { overviewData } from "../input/input-data"
import { getAPIConfig } from "./actions/get-api-config.action"

const initialState = {
  layout: generateOverviewLayout(overviewConfig),
  data: overviewData,
  lastResponse: {},
}

type StateType = {
  layout: typeof initialState.layout
  data: typeof initialState.data
  lastResponse: any
}

export const genericSlice = createReducer<StateType>(
  initialState,
  (builder) => {
    builder.addCase(getAPIConfig.fulfilled, (state, action) => {
      state.lastResponse = action.payload
    })
  }
)
