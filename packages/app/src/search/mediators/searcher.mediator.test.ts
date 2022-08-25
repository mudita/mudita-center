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

const threadSearcher = {
  search: jest.fn(),
} as unknown as BaseSearcher

const contactSearcher = {
  search: jest.fn(),
} as unknown as BaseSearcher

const templateSearcher = {
  search: jest.fn(),
} as unknown as BaseSearcher

const subject = new SearcherMediator(
  messageSearcher,
  threadSearcher,
  contactSearcher,
  templateSearcher
)

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

  describe("Mediate to ThreadSearcher", () => {
    test("class ThreadSearcher.search method with provided query", () => {
      subject.searchByScope(DataIndex.Thread, "Hello")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(threadSearcher.search).toHaveBeenCalledWith("Hello")
    })
  })

  describe("Mediate to ContactSearcher", () => {
    test("class ContactSearcher.search method with provided query", () => {
      subject.searchByScope(DataIndex.Contact, "Hello")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactSearcher.search).toHaveBeenCalledWith("Hello")
    })
  })

  describe("Mediate to TemplateSearcher", () => {
    test("class TemplateSearcher.search method with provided query", () => {
      subject.searchByScope(DataIndex.Template, "Hello")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(templateSearcher.search).toHaveBeenCalledWith("Hello")
    })
  })
})
