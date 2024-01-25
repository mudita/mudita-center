/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateMcOverviewTileListLayout } from "Libs/generic-view/views/src/lib/mc-overview/section-tile-list/section-tile-list"

describe("SectionTileList", () => {
  it("returns main component with children properly", () => {
    const result = generateMcOverviewTileListLayout({
      dataKey: "test-key",
      type: "tile-list",
      title: "test",
      fields: [
        {
          dataKey: "row-1",
          type: "icon-text",
        },
        {
          dataKey: "row-2",
          type: "icon-text",
        },
      ],
    })

    expect(result).toEqual({
      "test-key": {
        component: "block-box",
        config: {
          title: "test",
        },
        layout: {
          gridPlacement: {
            row: 1,
            column: 2,
            width: 1,
            height: 1,
          },
          flexLayout: {
            direction: "column",
            rowGap: "10px",
          },
        },
        childrenKeys: ["row-1", "row-2"],
      },
      "row-1": {
        component: "icon-text",
      },
      "row-2": {
        component: "icon-text",
      },
    })
  })
})
