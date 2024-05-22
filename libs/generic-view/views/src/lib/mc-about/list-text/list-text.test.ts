/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { generateMcAboutListTextLayout } from "./list-text"

describe("generateMcAboutListTextLayout", () => {
  it("should generate heading texts properly", () => {
    const result = generateMcAboutListTextLayout({
      dataKey: "key",
      title: "Title",
      type: "detail-list-text",
    })
    expect(result).toMatchObject({
      key: {
        config: {
          title: "Title",
        },
      },
    })
  })
})
