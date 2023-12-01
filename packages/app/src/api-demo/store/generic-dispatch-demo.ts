/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { wait } from "fork-ts-checker-webpack-plugin/lib/utils/async/wait"
import store from "App/__deprecated__/renderer/store"
import { generateMenu } from "../menu/menu-generator"
import { menuConfig } from "../input/input-menu"
import { apiConfigResponse } from "../input/input-api"
import {
  generateMcOverviewLayout,
  mcOverviewConfig, mcOverviewDemoData,
} from "../views/mc-overview"
import {
  generateMcCalendarLayout,
  mcCalendarConfig,
} from "../views/mc-calendar"
import { genericSlice } from "./slice"

// For demo purposes to simulate device connection and async data fetching
export const fillGenericStore = async () => {
  if (genericSlice.getInitialState().menu) {
    return
  }

  // Simulate menu setup after device connection
  await wait(2000)
  store.dispatch(genericSlice.actions.setMenu(generateMenu(menuConfig)))

  // Simulate views setup
  await wait(2000)
  store.dispatch(genericSlice.actions.setViews(apiConfigResponse.features))

  // Simulate mc-overview layout
  await wait(1000)
  store.dispatch(
    genericSlice.actions.setViewLayout({
      feature: "mc-overview",
      layout: generateMcOverviewLayout(mcOverviewConfig),
    })
  )

  // Simulate mc-calendar layout
  await wait(1000)
  store.dispatch(
    genericSlice.actions.setViewLayout({
      feature: "mc-calendar",
      layout: generateMcCalendarLayout(mcCalendarConfig),
    })
  )

  await wait(1000)
  store.dispatch(
    genericSlice.actions.setViewData({
      feature: "mc-overview",
      data: mcOverviewDemoData,
    })
  )
}
