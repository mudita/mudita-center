/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: demo code, file to be removed
import { wait } from "fork-ts-checker-webpack-plugin/lib/utils/async/wait"
import {
  generateMcCalendarLayout,
  generateMcOverviewLayout,
  mcCalendarConfig,
  mcOverviewConfig,
  mcOverviewDemoData,
} from "generic-view/views"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { menuConfig } from "../../../../../../demo-data/demo-menu"
import { generateMenu } from "generic-view/utils"
import { genericViewsSlice } from "../slice"

// For demo purposes to simulate device connection and async data fetching
export const useGenericStoreDemo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    void (async () => {
      if (genericViewsSlice.getInitialState().menu) {
        return
      }

      // Simulate menu setup after device connection
      await wait(2000)
      dispatch(genericViewsSlice.actions.setMenu(generateMenu(menuConfig)))

      // Simulate mc-overview layout
      await wait(1000)
      dispatch(
        genericViewsSlice.actions.setViewLayout({
          feature: "mc-overview",
          layout: generateMcOverviewLayout(mcOverviewConfig),
        })
      )

      // Simulate mc-calendar layout
      await wait(1000)
      dispatch(
        genericViewsSlice.actions.setViewLayout({
          feature: "mc-calendar",
          layout: generateMcCalendarLayout(mcCalendarConfig),
        })
      )

      await wait(1000)
      dispatch(
        genericViewsSlice.actions.setViewData({
          feature: "mc-overview",
          data: mcOverviewDemoData,
        })
      )
    })()
  }, [dispatch])
}
