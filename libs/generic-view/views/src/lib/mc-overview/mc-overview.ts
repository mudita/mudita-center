/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateDataConfig,
  generateViewConfig,
  MainView,
  ViewGenerator,
} from "generic-view/utils"
import {
  generateMcOverviewSummaryData,
  generateMcOverviewSummaryLayout,
} from "./summary/summary"
import { OverviewConfig, OverviewData } from "device/models"
import { generateMcOverviewTileListLayout } from "./section-tile-list/section-tile-list"

export const generateMcOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  console.log(config)
  const mainConfig: MainView = {
    screenTitle: config.title,
    component: "block-plain",
    layout: {
      padding: "32px",
      gridLayout: {
        rows: ["auto", 1, 1],
        columns: ["280px", 1],
        columnGap: "32px",
        rowGap: "32px",
      },
      flexPlacement: {
        grow: 1,
      },
    },
  }
  const summary = generateMcOverviewSummaryLayout(config.summary)
  const sections =
    config.summary.sections?.map((section) => {
      switch (section.type) {
        case "tile-list":
          return generateMcOverviewTileListLayout(section)
        default:
          return undefined
      }
    }) || []
  return generateViewConfig(mainConfig, [summary, ...sections])
}

export const generateMcOverviewData = (data: OverviewData) => {
  const summary = generateMcOverviewSummaryData(data.summary)
  return generateDataConfig([summary, data.sections])
}
