/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TemplatePresenter } from "App/data-sync/presenters"
import { TemplateInput } from "App/data-sync/types"

const subject = new TemplatePresenter()

const templateInputMock: TemplateInput = {
  templates: {
    columns: ["_id", "text", "lastUsageTimestamp"],
    values: [
      [
        "1",
        "Thanks for reaching out. I can't talk right now, I'll call you later",
        "4",
      ],
    ],
  },
}

describe("`TemplatePresenter`", () => {
  test("`serializeToObject` serialize record properly", async () => {
    const result = subject.serializeToObject(templateInputMock)

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "lastUsedAt": "4",
          "text": "Thanks for reaching out. I can't talk right now, I'll call you later",
        },
      ]
    `)
  })
})
