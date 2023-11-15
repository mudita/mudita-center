import { createSlice } from "@reduxjs/toolkit"
import { generateOverviewLayout } from "../output/overview-output"
import { overviewConfig } from "../input/input-config"
import { overviewData } from "../input/input-data"

const initialState = {
  layout: generateOverviewLayout(overviewConfig),
  data: overviewData,
}

export const genericSlice = createSlice({
  name: "generic-view",
  initialState,
  reducers: {},
})

