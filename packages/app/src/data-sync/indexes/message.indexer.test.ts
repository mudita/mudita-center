/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageIndexer } from "App/data-sync/indexes/message.indexer"
import { MessagePresenter } from "App/data-sync/presenters/message/message.presenter"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

afterAll(() => {
  jest.clearAllMocks()
})

describe("`MessageIndexer`", () => {
  test("`index` methods returns serialized index with objects", async () => {
    const indexer = new MessageIndexer(
      new FileSystemService(),
      new MessagePresenter()
    )
    const index = await indexer.index(
      "./src/testing-support/mocks/",
      "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"
    )

    expect(index.documentStore.toJSON().docs[1]).toMatchInlineSnapshot(`
      Object {
        "content": "Test",
        "date": 1970-01-01T00:06:31.000Z,
        "id": "1",
        "messageType": "FAILED",
        "phoneNumber": "123123123",
        "threadId": "1",
      }
    `)
  })
})
