/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadPresenter } from "App/data-sync/presenters"
import { ThreadInput } from "App/data-sync/types"

describe("`ThreadPresenter`", () => {
  test("`serializeToObject` serialize record properly", async () => {
    const threadInput: ThreadInput = {
      threads: {
        columns: [
          "_id",
          "contact_id",
          "date",
          "last_dir",
          "msg_count",
          "number_id",
          "read",
          "snippet",
        ],
        values: [["1", "4", "391", "2", "2", "5", "1", "Test"]],
      },
      contact_number: {
        columns: ["_id", "contact_id", "number_user", "number_e164", "type"],
        values: [["5", "4", "+91898402777", "", "0"]],
      },
    }

    const presenter = new ThreadPresenter()
    const threadObjects = presenter.serializeToObject(threadInput)
    expect(threadObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "lastUpdatedAt": 1970-01-01T00:06:31.000Z,
          "messageSnippet": "Test",
          "phoneNumber": "+91898402777",
          "unread": true,
        },
      ]
    `)
  })
})
