/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadPresenter } from "App/data-sync/presenters"
import { ThreadInput } from "App/data-sync/types"

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
  contact_name: {
    columns: ["_id", "contact_id", "name_alternative", "name_primary"],
    values: [["1", "4", "Luke", "Skywalker"]],
  },
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
      ["1", "Test Message", "4", "391", "", "1", "1"],
      ["2", "Test Message", "4", "392", "", "1", "1"],
    ],
  },
}

describe("Draft messages", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`serializeToObject` returns `messageSnippet` with `Draft` suffix", async () => {
    const presenter = new ThreadPresenter()
    const threadObjects = presenter.serializeToObject(threadInput)
    expect(threadObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "contactId": "4",
          "contactName": "Skywalker Luke",
          "id": "1",
          "lastUpdatedAt": 1970-01-01T00:06:31.000Z,
          "messageSnippet": "Draft: Test Message",
          "messageType": "INBOX",
          "phoneNumber": "+91898402777",
          "unread": true,
        },
      ]
    `)
  })
})

describe("Other types of messages", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`serializeToObject` returns `messageSnippet` without `Draft` suffix", async () => {
    const presenter = new ThreadPresenter()
    const threadObjects = presenter.serializeToObject({
      ...threadInput,
      sms: {
        ...threadInput.sms,
        values: [
          ["1", "Test Message", "4", "391", "", "1", "4"],
          ["2", "Test Message", "4", "392", "", "1", "4"],
        ],
      },
    })

    expect(threadObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "contactId": "4",
          "contactName": "Skywalker Luke",
          "id": "1",
          "lastUpdatedAt": 1970-01-01T00:06:31.000Z,
          "messageSnippet": "Test Message",
          "messageType": "INBOX",
          "phoneNumber": "+91898402777",
          "unread": true,
        },
      ]
    `)
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("when sms table is empty serialize record properly", async () => {
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
      contact_name: {
        columns: ["_id", "contact_id", "name_alternative", "name_primary"],
        values: [["1", "4", "Luke", "Skywalker"]],
      },
      sms: {
        columns: [],
        values: [],
      },
    }

    const presenter = new ThreadPresenter()
    const threadObjects = presenter.serializeToObject(threadInput)
    expect(threadObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "contactId": "4",
          "contactName": "Skywalker Luke",
          "id": "1",
          "lastUpdatedAt": 1970-01-01T00:06:31.000Z,
          "messageSnippet": "",
          "messageType": "OUTBOX",
          "phoneNumber": "+91898402777",
          "unread": true,
        },
      ]
    `)
  })
})

describe("Thread without messages", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`serializeToObject` returns empty `messageSnippet`", async () => {
    const presenter = new ThreadPresenter()
    const threadObjects = presenter.serializeToObject({
      ...threadInput,
      sms: {
        ...threadInput.sms,
        values: [],
      },
    })

    expect(threadObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "contactId": "4",
          "contactName": "Skywalker Luke",
          "id": "1",
          "lastUpdatedAt": 1970-01-01T00:06:31.000Z,
          "messageSnippet": "",
          "messageType": "OUTBOX",
          "phoneNumber": "+91898402777",
          "unread": true,
        },
      ]
    `)
  })
})
