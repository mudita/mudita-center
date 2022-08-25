/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr from "elasticlunr"
import { AppError } from "App/core/errors"
import { IndexFactory } from "App/index-storage/factories"
import { MessageType } from "App/messages/constants"
import { Thread } from "App/messages/dto"
import { DataIndex } from "App/index-storage/constants"
import { SearcherError } from "App/search/constants"
import { ThreadSearcher } from "App/search/searchers/thread.searcher"

const indexThreadMock = elasticlunr<Thread>()
const threadMock: Thread = {
  id: "1",
  lastUpdatedAt: new Date(1617089558 * 1000),
  messageSnippet:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  unread: true,
  phoneNumber: "123123123",
  messageType: MessageType.INBOX,
}

describe("When index exists", () => {
  const index = new IndexFactory().create()
  const subject = new ThreadSearcher(index)

  beforeAll(() => {
    index.set(DataIndex.Thread, indexThreadMock)

    indexThreadMock.setRef("id")
    indexThreadMock.addField("lastUpdatedAt")
    indexThreadMock.addField("messageSnippet")
    indexThreadMock.addField("unread")
    indexThreadMock.addField("phoneNumber")
    indexThreadMock.addField("messageType")

    indexThreadMock.addDoc(threadMock)
  })

  test("returns hydrated `threads` list if query match to string in fields", () => {
    expect(subject.search("laborum")).toEqual([threadMock])
  })

  test("returns empty array if query doesn't match to string in fields", () => {
    expect(subject.search("Hello")).toEqual([])
  })
})

describe("When index doesn't exists", () => {
  const index = new IndexFactory().create()
  const subject = new ThreadSearcher(index)

  test("throw an error with `SearcherError.SearcherDoesntExists` type", () => {
    expect(() => subject.search("laborum")).toThrow(
      new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Thread} can't be found`
      )
    )
  })
})
