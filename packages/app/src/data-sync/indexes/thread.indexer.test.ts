/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadIndexer } from "App/data-sync/indexes/thread.indexer"
import { ThreadPresenter } from "App/data-sync/presenters/thread/thread.presenter"

afterAll(() => {
  jest.clearAllMocks()
})

describe("`ThreadIndexer`", () => {
  test("`index` methods returns serialized index with objects", async () => {
    const indexer = new ThreadIndexer(new ThreadPresenter())
    const index = await indexer.index("./src/testing-support/mocks/")

    expect(index.documentStore.getDoc(1)).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "lastUpdatedAt": 0391-01-01T00:00:00.000Z,
        "messageSnippet": "Test",
        "phoneNumber": "123123123",
        "unread": true,
      }
    `)
  })
})
