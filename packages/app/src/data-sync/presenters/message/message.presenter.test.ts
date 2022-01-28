/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessagePresenter } from "App/data-sync/presenters"
import { MessageInput } from "App/data-sync/types"

describe("`MessagePresenter`", () => {
  test("`serializeToObject` serialize record properly", async () => {
    const messageInput: MessageInput = {
      sms: {
        columns: [
          "_id",
          "body",
          "contact_id",
          "date",
          "error_code",
          "thread_id",
          "type",
        ],
        values: [
          ["1", "Test Message #1", "4", "391", "", "1", "1"],
          ["2", "Test Message #2", "4", "392", "", "1", "1"],
        ],
      },
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

    const presenter = new MessagePresenter()
    const messageObjects = presenter.serializeToObject(messageInput)
    expect(messageObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "Test Message #1",
          "date": 1970-01-01T00:06:31.000Z,
          "id": "1",
          "messageType": "INBOX",
          "phoneNumber": "+91898402777",
          "threadId": "1",
        },
        Object {
          "content": "Test Message #2",
          "date": 1970-01-01T00:06:32.000Z,
          "id": "2",
          "messageType": "INBOX",
          "phoneNumber": "+91898402777",
          "threadId": "1",
        },
      ]
    `)
  })
})
