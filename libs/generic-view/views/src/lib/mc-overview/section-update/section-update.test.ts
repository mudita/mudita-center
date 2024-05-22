/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateMcOverviewUpdateData,
  generateMcOverviewUpdateLayout,
} from "./section-update"
import { View } from "generic-view/utils"

describe("generateMcOverviewUpdateLayout", () => {
  it("should generate box title properly", () => {
    const result = generateMcOverviewUpdateLayout({
      dataKey: "key",
      title: "Title",
      showBadge: false,
      type: "mc-overview-update",
      versionLabel: "Version Label",
      currentVersionKey: "currentVersionKey",
    })

    expect(result).toMatchObject({
      key: {
        config: {
          title: "Title",
        },
      },
    })
  })

  it("should generate children components properly", () => {
    const result = generateMcOverviewUpdateLayout({
      dataKey: "key",
      title: "Title",
      showBadge: false,
      type: "mc-overview-update",
      versionLabel: "Version Label",
      currentVersionKey: "currentVersionKey",
    })

    expect(result).toMatchObject({
      key: {
        childrenKeys: ["keyversion"],
      },
      keyversion: {
        config: {
          versionLabel: "Version Label",
        },
      },
    })
  })
})

describe("generateMcOverviewUpdateData", () => {
  it("should generate data properly", () => {
    const result = generateMcOverviewUpdateData(
      {
        key: {
          version: "12",
          text: "12",
        },
      },
      {
        main: {
          screenTitle: "Title",
          config: {
            title: "Title",
          },
          childrenKeys: ["key"],
          component: "block-plain",
        },
        key: {
          component: "block-box",
          childrenKeys: ["keyversion"],
        },
        keyversion: {
          component: "overview-os-version",
        },
      } as View
    )

    expect(result).toMatchObject({
      keyversion: {
        version: "12",
      },
    })
  })
})
