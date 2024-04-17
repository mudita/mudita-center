/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateMcAboutListModalData,
  generateMcAboutListModalLayout,
} from "./list-modal"

describe("generateMcAboutListModalLayout", () => {
  it("should generate all required components properly", () => {
    const result = generateMcAboutListModalLayout({
      dataKey: "key",
      title: "Title",
      buttonText: "press me",
      type: "detail-list-modal",
    })
    expect(result).toMatchObject({
      key: {
        config: {
          title: "Title",
        },
        childrenKeys: ["keymodal-button"],
      },
      "keymodal-button": {
        config: {
          text: "press me",
          action: {
            type: "open-modal",
            modalKey: "keymodal",
          },
        },
      },
      keymodal: {
        childrenKeys: ["keymodal-content"],
      },
      "keymodal-content": {},
    })
  })
})

describe("generateMcAboutListModalData", () => {
  it("should generate data for required components properly", () => {
    const result = generateMcAboutListModalData(
      {
        key: {
          text: "Value",
        },
      },
      {
        key: {
          component: "about-data-box",
          childrenKeys: ["keymodal-button"],
          config: {
            title: "Title",
          },
        },
        "keymodal-content": {
          component: "text-formatted",
        },
      }
    )
    expect(result).toMatchObject({
      "keymodal-content": {
        text: "Value",
      },
    })
  })
})
