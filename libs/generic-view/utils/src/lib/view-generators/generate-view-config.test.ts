/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateViewConfig } from "./generate-view-config"

describe("generateMainViewConfig", () => {
  it("should properly generate main feature", () => {
    const result = generateViewConfig(
      {
        screenTitle: "Test",
        component: "block-plain",
        layout: {
          padding: "32px",
        },
      },
      []
    )
    expect(result).toEqual({
      main: {
        screenTitle: "Test",
        component: "block-plain",
        layout: {
          padding: "32px",
        },
        childrenKeys: [],
      },
    })
  })

  it("should properly generate other features", () => {
    const result = generateViewConfig(
      {
        screenTitle: "Test",
        component: "block-plain",
        layout: {
          padding: "32px",
        },
      },
      [
        {
          "feature-1": {
            component: "block-box",
            childrenKeys: ["feature-1-a", "feature-1-b"],
          },
          "feature-1-a": {
            component: "block-box",
          },
          "feature-1-b": {
            component: "block-box",
          },
        },
        {
          "feature-2": {
            component: "block-box",
            childrenKeys: ["feature-2-a"],
          },
          "feature-2-a": {
            component: "block-box",
          },
        },
      ]
    )
    expect(result).toEqual({
      main: {
        screenTitle: "Test",
        component: "block-plain",
        layout: {
          padding: "32px",
        },
        childrenKeys: ["feature-1", "feature-2"],
      },
      "feature-1": {
        component: "block-box",
        childrenKeys: ["feature-1-a", "feature-1-b"],
      },
      "feature-1-a": {
        component: "block-box",
      },
      "feature-1-b": {
        component: "block-box",
      },
      "feature-2": {
        component: "block-box",
        childrenKeys: ["feature-2-a"],
      },
      "feature-2-a": {
        component: "block-box",
      },
    })
  })
})
