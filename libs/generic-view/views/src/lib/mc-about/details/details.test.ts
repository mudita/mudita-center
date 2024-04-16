/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateMcAboutDetailsLayout } from "./details"

describe("generateMcAboutDetailsLayout", () => {
  it("should generate children keys properly", () => {
    const result = generateMcAboutDetailsLayout({
      childrenKeys: ["key1", "key2"],
    })
    expect(result).toMatchObject({
      details: {
        childrenKeys: ["key1", "key2"],
      },
    })
  })
})
