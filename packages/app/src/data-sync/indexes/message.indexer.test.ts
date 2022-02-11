/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageIndexer } from "App/data-sync/indexes/message.indexer"
import { MessagePresenter } from "App/data-sync/presenters/message/message.presenter"
import { SyncFileSystemService } from "App/data-sync/services/sync-file-system.service"

afterAll(() => {
  jest.clearAllMocks()
})

describe("`MessageIndexer`", () => {
  test("`index` methods returns serialized index with objects", async () => {
    const indexer = new MessageIndexer(
      new SyncFileSystemService("Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"),
      new MessagePresenter()
    )
    const index = await indexer.index("./src/testing-support/mocks/")

    expect(index.documentStore.docs[1]).toMatchInlineSnapshot(`
      Object {
        "content": "Test",
        "date": 1970-01-01T00:06:31.000Z,
        "id": "1",
        "messageType": "OUTBOX",
        "phoneNumber": "123123123",
        "threadId": "1",
      }
    `)
  })
})
