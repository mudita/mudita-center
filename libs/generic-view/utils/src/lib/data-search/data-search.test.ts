/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataSearch } from "./data-search"
import { UseViewFormContext } from "generic-view/utils"
import { DataProviderSearchConfig } from "device/models"

describe("dataSearch", () => {
  const mockFormContext: UseViewFormContext = jest.fn().mockReturnValue({
    watch: jest.fn().mockReturnValue("searchPhrase")
  })

  it("returns all data when config is undefined", () => {
    const search = dataSearch(mockFormContext)
    const data = [{ field: "value" }]
    expect(search(data)).toEqual(data)
  })

  it("returns undefined when search phrase length is less than minPhraseLength", () => {
    const search = dataSearch(mockFormContext)
    const data = [{ field: "value" }]
    const config: DataProviderSearchConfig = {
      fields: [{ field: "field", mode: "exact", caseSensitive: false }],
      phraseSource: { type: "form-fields", formKey: "form", field: "field" },
      minPhraseLength: 20
    }
    expect(search(data, config)).toBeUndefined()
  })

  it("filters data based on exact match", () => {
    const search = dataSearch(mockFormContext)
    const data = [{ field: "searchPhrase" }, { field: "otherValue" }]
    const config: DataProviderSearchConfig = {
      fields: [{ field: "field", mode: "exact", caseSensitive: false }],
      phraseSource: { type: "form-fields", formKey: "form", field: "field" }
    }
    expect(search(data, config)).toEqual([{ field: "searchPhrase" }])
  })

  it("filters data based on includes match", () => {
    const search = dataSearch(mockFormContext)
    const data = [{ field: "this is a searchPhrase" }, { field: "otherValue" }]
    const config: DataProviderSearchConfig = {
      fields: [{ field: "field", mode: "includes", caseSensitive: false }],
      phraseSource: { type: "form-fields", formKey: "form", field: "field" }
    }
    expect(search(data, config)).toEqual([{ field: "this is a searchPhrase" }])
  })

  it("filters data based on startsWith match", () => {
    const search = dataSearch(mockFormContext)
    const data = [{ field: "searchPhrase starts here" }, { field: "otherValue" }]
    const config: DataProviderSearchConfig = {
      fields: [{ field: "field", mode: "startsWith", caseSensitive: false }],
      phraseSource: { type: "form-fields", formKey: "form", field: "field" }
    }
    expect(search(data, config)).toEqual([{ field: "searchPhrase starts here" }])
  })

  it("filters data case-sensitively", () => {
    const search = dataSearch(mockFormContext)
    const data = [{ field: "searchPhrase" }, { field: "SearchPhrase" }]
    const config: DataProviderSearchConfig = {
      fields: [{ field: "field", mode: "exact", caseSensitive: true }],
      phraseSource: { type: "form-fields", formKey: "form", field: "field" }
    }
    expect(search(data, config)).toEqual([{ field: "searchPhrase" }])
  })
})
