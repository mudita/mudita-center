/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ViewGenerator2 } from "generic-view/utils"
import { McOverviewConfig } from "generic-view/models"
import { generateSummary } from "./summary"
import { generateTileListSection } from "./tile-list-section"

const deviceSummaryKey = "device-summary"

export const generateMcOverviewViewLayout: ViewGenerator2<McOverviewConfig> = ({
  config,
}) => {
  const summary = generateSummary({ config, key: deviceSummaryKey })

  const sections =
    config.sections?.map((section) => {
      switch (section.type) {
        case "tile-list":
          return generateTileListSection({ config: section })
        default:
          return undefined
      }
    }) || []

  return {
    main: {
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
      childrenKeys: [...(summary ? [deviceSummaryKey] : [])],
    },
    ...summary,
  }
}
