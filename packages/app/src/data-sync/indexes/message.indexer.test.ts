/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageIndexer } from "App/data-sync/indexes/message.indexer"
import { MessagePresenter } from "App/data-sync/presenters/message/message.presenter"

afterAll(() => {
  jest.clearAllMocks()
})

describe("`MessageIndexer`", () => {
  test("`index` methods returns serialized index with objects", async () => {
    const indexer = new MessageIndexer(new MessagePresenter())
    const index = await indexer.index("./src/testing-support/mocks/")

    expect(index.documentStore.getDoc(1)).toMatchInlineSnapshot(`
      Object {
        "content": "Test",
        "date": 0391-01-01T00:00:00.000Z,
        "id": "1",
        "messageType": "OUTBOX",
        "phoneNumber": "123123123",
        "threadId": "1",
      }
    `)
  })
})
