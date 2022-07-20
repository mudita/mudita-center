/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadIndexer } from "App/data-sync/indexes/thread.indexer"
import { ThreadPresenter } from "App/data-sync/presenters/thread/thread.presenter"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

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
      "./src/testing-support/mocks/",
      "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"
    )

    expect(index.documentStore.toJSON().docs[1]).toMatchInlineSnapshot(`
      Object {
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
