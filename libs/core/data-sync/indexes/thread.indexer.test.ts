/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadIndexer } from "Core/data-sync/indexes/thread.indexer"
import { ThreadPresenter } from "Core/data-sync/presenters/thread/thread.presenter"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import path from "path"

afterAll(() => {
  jest.clearAllMocks()
})

describe("`ThreadIndexer`", () => {
  test("`index` methods returns serialized index with objects", async () => {
    const indexer = new ThreadIndexer(
      new FileSystemService(),
      new ThreadPresenter()
    )
    const index = await indexer.index(
      path.join(__dirname, "../../../../jest/testing-support/mocks/"),
      "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"
    )

    expect(index.documentStore.toJSON().docs[1]).toMatchInlineSnapshot(`
      Object {
        "contactId": "1",
        "contactName": "Test User 1",
        "id": "1",
        "lastUpdatedAt": 1970-01-01T00:06:31.000Z,
        "messageSnippet": "Test",
        "messageType": "FAILED",
        "phoneNumber": "123123123",
        "unread": false,
      }
    `)
  })
})
