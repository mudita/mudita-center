/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateMcAboutHeadingLayout } from "./heading"

describe("generateMcAboutHeadingLayout", () => {
  it("should generate heading texts properly", () => {
    const result = generateMcAboutHeadingLayout({
      aboutTitle: "About title",
      aboutSubtitle: "About subtitle",
    })
    expect(result).toMatchObject({
      header: {
        config: {
          heading: "About title",
          subheading: "About subtitle",
        },
      },
    })
  })
})
