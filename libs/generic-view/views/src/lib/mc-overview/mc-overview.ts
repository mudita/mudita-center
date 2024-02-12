/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateViewConfig,
  MainView,
  View,
  ViewGenerator,
} from "generic-view/utils"
import {
  generateMcOverviewSummaryData,
  generateMcOverviewSummaryLayout,
} from "./summary/summary"
import { OverviewConfig, OverviewData } from "device/models"
import { generateMcOverviewTileListLayout } from "./section-tile-list/section-tile-list"
import {
  generateMcOverviewUpdateData,
  generateMcOverviewUpdateLayout,
} from "./section-update/section-update"

export const generateMcOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  const summary = generateMcOverviewSummaryLayout(config.summary)
  const sections =
    config.sections?.map((section) => {
      switch (section?.type) {
        case "tile-list":
          return generateMcOverviewTileListLayout(section)
        case "mc-overview-update":
          return generateMcOverviewUpdateLayout(section)
        default:
          return undefined
      }
    }) || []

  sections.push({
    backup: {
      component: "block-box",
      config: {
        title: "Backup",
      },
      layout: {
        gridPlacement: {
          row: 3,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "column",
          justifyContent: "space-between",
        },
      },
      childrenKeys: ["backup-box"],
    },
    "backup-box": {
      component: "backup-box",
    },
  })

  const mainConfig: MainView = {
    screenTitle: config.title,
    component: "block-plain",
    layout: {
      padding: "32px",
      gridLayout: {
        rows:
          sections.length === 3
            ? ["auto", 1, 1]
            : ["auto", "minmax(auto, 172px)", 1],
        columns: ["280px", 1],
        columnGap: "32px",
        rowGap: sections.length === 3 ? "20px" : "32px",
      },
      flexPlacement: {
        grow: 1,
      },
    },
  }
  return generateViewConfig(mainConfig, [summary, ...sections])
}

export const generateMcOverviewData = (data: OverviewData, config?: View) => {
  const summary = generateMcOverviewSummaryData(data.summary)
  const sections = generateMcOverviewUpdateData(data.sections, config)
  return {
    ...summary,
    ...sections,
  }
}
