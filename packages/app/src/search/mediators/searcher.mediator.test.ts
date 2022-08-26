/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/index-storage/constants"
import { SearcherMediator } from "App/search/mediators/searcher.mediator"
import { BaseSearcher } from "App/search/searchers/base.searcher"

const messageSearcher = {
  search: jest.fn(),
} as unknown as BaseSearcher

const subject = new SearcherMediator(messageSearcher)

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Method: searchByScope", () => {
  describe("Mediate to MessageSearcher", () => {
    test("class MessageSearcher.search method with provided query", () => {
      subject.searchByScope(DataIndex.Message, "Hello")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(messageSearcher.search).toHaveBeenCalledWith("Hello")
    })
  })
})
