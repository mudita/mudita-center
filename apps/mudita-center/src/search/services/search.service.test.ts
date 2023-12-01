/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/index-storage/constants"
import { SearchService } from "App/search/services/search.service"
import { SearcherMediator } from "App/search/mediators/searcher.mediator"

const searcherMediator = {
  searchByScope: jest.fn(),
} as unknown as SearcherMediator

const subject = new SearchService(searcherMediator)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("Method: search", () => {
  test("calls `SearcherMediator.searchByScope` method if scope list is provided", () => {
    subject.search({
      scope: [DataIndex.Message],
      query: "test query",
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(searcherMediator.searchByScope).toBeCalledWith(
      DataIndex.Message,
      "test query"
    )
  })

  test("don't calls `SearcherMediator.searchByScope` method if scope empty", () => {
    subject.search({
      scope: [],
      query: "test query",
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(searcherMediator.searchByScope).not.toBeCalled()
  })
})
