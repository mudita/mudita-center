/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getViewMainChildrenKeys, ViewGenerator } from "generic-view/utils"
import { generateMcOverviewSummaryLayout } from "./summary/summary"
import { OverviewConfig } from "./mc-overview.types"

export const generateMcOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  const summary = generateMcOverviewSummaryLayout(config.summary)
  return {
    main: {
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
      childrenKeys: getViewMainChildrenKeys([summary]),
    },
    ...summary,
  }
}
