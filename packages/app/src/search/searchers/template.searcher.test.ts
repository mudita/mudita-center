/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr from "elasticlunr"
import { AppError } from "App/core/errors"
import { IndexFactory } from "App/index-storage/factories"
import { Template } from "App/templates/dto"
import { DataIndex } from "App/index-storage/constants"
import { SearcherError } from "App/search/constants"
import { TemplateSearcher } from "App/search/searchers/template.searcher"

const indexTemplateMock = elasticlunr<Template>()
const templateMock: Template = {
  id: "2",
  text: "Test template",
  lastUsedAt: "1574335694",
  order: 2,
}

describe("When index exists", () => {
  const index = new IndexFactory().create()
  const subject = new TemplateSearcher(index)

  beforeAll(() => {
    index.set(DataIndex.Template, indexTemplateMock)

    indexTemplateMock.setRef("id")
    indexTemplateMock.addField("text")
    indexTemplateMock.addField("lastUsedAt")
    indexTemplateMock.addField("order")

    indexTemplateMock.addDoc(templateMock)
  })

  test("returns hydrated `templates` list if query match to string in fields", () => {
    expect(subject.search("Test")).toEqual([templateMock])
  })

  test("returns hydrated `templates` list if query contains only a part of the word", () => {
    expect(subject.search("Te")).toEqual([templateMock])
  })

  test("returns empty array if query doesn't match to string in fields", () => {
    expect(subject.search("Hello")).toEqual([])
  })
})

describe("When index doesn't exists", () => {
  const index = new IndexFactory().create()
  const subject = new TemplateSearcher(index)

  test("throw an error with `SearcherError.SearcherDoesntExists` type", () => {
    expect(() => subject.search("laborum")).toThrow(
      new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Template} can't be found`
      )
    )
  })
})
