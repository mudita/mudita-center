/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataProviderFilter } from "./data-provider-filter"

describe("dataProviderFilter", () => {
  it("returns all data when no filters are provided", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataProviderFilter(data)
    expect(result).toEqual(data)
  })

  it("filters data based on single field with single pattern", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const filters = { name: ["/Alice/"] }
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual([{ name: "Alice" }])
  })

  it("filters data based on nested field with single pattern", () => {
    const data = [{ user: { name: "Alice" } }, { user: { name: "Bob" } }]
    const filters = { "user.name": ["/Alice/"] }
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual([{ user: { name: "Alice" } }])
  })

  it("filters data based on single field with multiple patterns", () => {
    const data = [{ name: "Alice" }, { name: "Anastasia" }, { name: "Charlie" }]
    const filters = { name: ["/^A/m", "/.+e$/m"] }
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual([{ name: "Alice" }])
  })

  it("filters data based on multiple fields", () => {
    const data = [
      { name: "Alice", age: "25" },
      { name: "Anastasia", age: "29" },
      { name: "Agnes", age: "30" },
    ]
    const filters = { name: ["/^A/m"], age: ["/2[\\d]/"] }
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual([
      { name: "Alice", age: "25" },
      { name: "Anastasia", age: "29" },
    ])
  })

  it("returns empty array when no data matches the filters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const filters = { name: ["/Charlie/"] }
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual([])
  })

  it("handles empty data array", () => {
    const data: Record<string, unknown>[] = []
    const filters = { name: ["/Alice/"] }
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual([])
  })

  it("handles undefined data", () => {
    const filters = { name: ["/Alice/"] }
    const result = dataProviderFilter(undefined, filters)
    expect(result).toEqual([])
  })

  it("handles undefined filters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataProviderFilter(data, undefined)
    expect(result).toEqual(data)
  })

  it("handles empty filters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const filters = {}
    const result = dataProviderFilter(data, filters)
    expect(result).toEqual(data)
  })
})