/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateMcOverviewTileListLayout } from "./section-tile-list"

describe("generateMcOverviewTileListLayout", () => {
  it("should generate box title properly", () => {
    const result = generateMcOverviewTileListLayout({
      dataKey: "key",
      type: "tile-list",
      title: "Title",
      fields: [],
    })

    expect(result).toMatchObject({
      key: {
        config: {
          title: "Title",
        },
      },
    })
  })

  it("should transform fields to generic components properly", () => {
    const result = generateMcOverviewTileListLayout({
      dataKey: "key",
      type: "tile-list",
      title: "Title",
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

    expect(result).toMatchObject({
      key: {
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
