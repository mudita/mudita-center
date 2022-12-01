/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TemplatePresenter } from "App/data-sync/presenters"
import { TemplateInput } from "App/data-sync/types"

const subject = new TemplatePresenter()

const templateInputMock: TemplateInput = {
  templates: {
    columns: ["_id", "text", "lastUsageTimestamp", "rowOrder"],
    values: [
      [
        "1",
        "Thanks for reaching out. I can't talk right now, I'll call you later",
        "4",
        "1",
      ],
    ],
  },
}

describe("`TemplatePresenter`", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`serializeToObject` serialize record properly", async () => {
    const result = subject.serializeToObject(templateInputMock)

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "lastUsedAt": "4",
          "order": 1,
          "text": "Thanks for reaching out. I can't talk right now, I'll call you later",
        },
      ]
    `)
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`serializeToObject` returns empty array when `templates` is `undefined`", async () => {
    const result = subject.serializeToObject({ templates: undefined })

    expect(result).toMatchInlineSnapshot(`Array []`)
  })
})
