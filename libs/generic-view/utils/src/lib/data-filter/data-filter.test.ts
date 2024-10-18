/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataFilter } from "./data-filter"
import { DataProviderFiltersConfig } from "device/models"

describe("dataProviderFilter", () => {
  it("returns all data when no filters are provided", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataFilter(data)
    expect(result).toEqual(data)
  })

  it("filters data based on single field with single pattern", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const filters: DataProviderFiltersConfig = [
      { providerField: "name", patterns: ["/Alice/"] },
    ]
    const result = dataFilter(data, filters)
    expect(result).toEqual([{ name: "Alice" }])
  })

  it("filters data based on nested field with single pattern", () => {
    const data = [{ user: { name: "Alice" } }, { user: { name: "Bob" } }]
    const filters: DataProviderFiltersConfig = [
      { providerField: "user.name", patterns: ["/Alice/"] },
    ]
    const result = dataFilter(data, filters)
    expect(result).toEqual([{ user: { name: "Alice" } }])
  })

  it("filters data based on single field with multiple patterns", () => {
    const data = [{ name: "Alice" }, { name: "Anastasia" }, { name: "Charlie" }]
    const filters: DataProviderFiltersConfig = [
      { providerField: "name", patterns: ["/^A/m", "/.+e$/m"] },
    ]
    const result = dataFilter(data, filters)
    expect(result).toEqual([{ name: "Alice" }])
  })

  it("filters data based on multiple fields", () => {
    const data = [
      { name: "Alice", age: "25" },
      { name: "Anastasia", age: "29" },
      { name: "Agnes", age: "30" },
    ]
    const filters: DataProviderFiltersConfig = [
      { providerField: "name", patterns: ["/^A/m"] },
      { providerField: "age", patterns: ["/2[\\d]/"] },
    ]
    const result = dataFilter(data, filters)
    expect(result).toEqual([
      { name: "Alice", age: "25" },
      { name: "Anastasia", age: "29" },
    ])
  })

  it("returns empty array when no data matches the filters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const filters: DataProviderFiltersConfig = [
      { providerField: "name", patterns: ["/Charlie/"] },
    ]
    const result = dataFilter(data, filters)
    expect(result).toEqual([])
  })

  it("handles empty data array", () => {
    const data: Record<string, unknown>[] = []
    const filters: DataProviderFiltersConfig = [
      { providerField: "name", patterns: ["/Alice/"] },
    ]
    const result = dataFilter(data, filters)
    expect(result).toEqual([])
  })

  it("handles undefined data", () => {
    const filters: DataProviderFiltersConfig = [
      { providerField: "name", patterns: ["/Alice/"] },
    ]
    const result = dataFilter(undefined, filters)
    expect(result).toEqual([])
  })

  it("handles undefined filters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataFilter(data, undefined)
    expect(result).toEqual(data)
  })

  it("handles empty filters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const filters = [] as DataProviderFiltersConfig
    const result = dataFilter(data, filters)
    expect(result).toEqual(data)
  })
})
