/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TemplateIndexer } from "App/data-sync/indexes/template.indexer"
import { TemplatePresenter } from "App/data-sync/presenters/template/template.presenter"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

afterAll(() => {
  jest.clearAllMocks()
})

describe("`TemplateIndexer`", () => {
  test("`index` methods returns serialized index with objects", async () => {
    const indexer = new TemplateIndexer(
      new FileSystemService(),
      new TemplatePresenter()
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const index = await indexer.index(
      "./src/testing-support/mocks/",
      "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    expect(index.documentStore.toJSON().docs).toMatchInlineSnapshot(`
      Object {
        "1": Object {
          "id": "1",
          "lastUsedAt": "4",
          "order": 1,
          "text": "Thanks for reaching out. I can't talk right now, I'll call you later",
        },
        "2": Object {
          "id": "2",
          "lastUsedAt": "3",
          "order": 2,
          "text": "I'll call you later",
        },
        "3": Object {
          "id": "3",
          "lastUsedAt": "2",
          "order": 3,
          "text": "I'll be there in 15 minutes",
        },
        "4": Object {
          "id": "4",
          "lastUsedAt": "5",
          "order": 4,
          "text": "Give me 5 minutes",
        },
      }
    `)
  })
})
