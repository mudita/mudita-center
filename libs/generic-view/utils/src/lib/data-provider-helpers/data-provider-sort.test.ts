/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataProviderSort } from "./data-provider-sort"
import { DataProviderSortConfig } from "device/models"

describe("dataProviderSort", () => {
  it("returns all data when no sort configuration is provided", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataProviderSort(data)
    expect(result).toEqual(data)
  })

  it("sorts data based on single field in ascending order", () => {
    const data = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }]
    const sort = [
      { providerField: "name", direction: "asc", priority: 1 },
    ] as DataProviderSortConfig
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ])
  })

  it("sorts data based on nested field in ascending order", () => {
    const data = [
      { user: { name: "Charlie" } },
      { user: { name: "Alice" } },
      { user: { name: "Bob" } },
    ]
    const sort: DataProviderSortConfig = [
      { providerField: "user.name", direction: "asc", priority: 1 },
    ]
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([
      { user: { name: "Alice" } },
      { user: { name: "Bob" } },
      { user: { name: "Charlie" } },
    ])
  })

  it("sorts data based on single field in descending order", () => {
    const data = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }]
    const sort: DataProviderSortConfig = [
      { providerField: "name", direction: "desc", priority: 1 },
    ]
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([
      { name: "Charlie" },
      { name: "Bob" },
      { name: "Alice" },
    ])
  })

  describe("dataProviderSort with sensitivity options", () => {
    it("sorts data with sensitivity set to 'base' (ignores case and accents)", () => {
      const data = [
        { name: "alice" },
        { name: "álice" },
        { name: "Bob" },
        { name: "charlie" },
        { name: "Alice" },
      ]
      const sort: DataProviderSortConfig = [
        {
          providerField: "name",
          direction: "asc",
          priority: 1,
          sensitivity: "base",
        },
      ]
      const result = dataProviderSort(data, sort)

      expect(result).toEqual([
        { name: "alice" },
        { name: "álice" },
        { name: "Alice" },
        { name: "Bob" },
        { name: "charlie" },
      ])
    })

    it("sorts data with sensitivity set to 'accent' (ignores case, but considers accents)", () => {
      const data = [
        { name: "alice" },
        { name: "álice" },
        { name: "Bob" },
        { name: "charlie" },
        { name: "Alice" },
      ]
      const sort: DataProviderSortConfig = [
        {
          providerField: "name",
          direction: "asc",
          priority: 1,
          sensitivity: "accent",
        },
      ]
      const result = dataProviderSort(data, sort)

      expect(result).toEqual([
        { name: "alice" },
        { name: "Alice" },
        { name: "álice" },
        { name: "Bob" },
        { name: "charlie" },
      ])
    })

    it("sorts data with sensitivity set to 'case' (considers case, but ignores accents)", () => {
      const data = [
        { name: "alice" },
        { name: "álice" },
        { name: "Bob" },
        { name: "charlie" },
        { name: "Alice" },
      ]
      const sort: DataProviderSortConfig = [
        {
          providerField: "name",
          direction: "asc",
          priority: 1,
          sensitivity: "case",
        },
      ]
      const result = dataProviderSort(data, sort)
      expect(result).toEqual([
        { name: "alice" },
        { name: "álice" },
        { name: "Alice" },
        { name: "Bob" },
        { name: "charlie" },
      ])
    })

    it("sorts data with sensitivity set to 'variant' (considers both case and accents)", () => {
      const data = [
        { name: "alice" },
        { name: "álice" },
        { name: "Bob" },
        { name: "charlie" },
        { name: "Alice" },
      ]
      const sort: DataProviderSortConfig = [
        {
          providerField: "name",
          direction: "asc",
          priority: 1,
          sensitivity: "variant",
        },
      ]
      const result = dataProviderSort(data, sort)
      expect(result).toEqual([
        { name: "alice" },
        { name: "Alice" },
        { name: "álice" },
        { name: "Bob" },
        { name: "charlie" },
      ])
    })
  })

  describe("dataProviderSort with `emptyOrder` options", () => {
    it("sorts data with empty values first when `emptyOrder` is set to 'first'", () => {
      const data = [
        { name: "alice" },
        { name: null },
        { name: "Bob" },
        { name: "charlie" },
        { name: "" },
        { name: undefined },
      ]
      const sort: DataProviderSortConfig = [
        {
          providerField: "name",
          direction: "asc",
          priority: 1,
          emptyOrder: "first",
        },
      ]
      const result = dataProviderSort(data, sort)

      expect(result).toEqual([
        { name: null },
        { name: "" },
        { name: undefined },
        { name: "alice" },
        { name: "Bob" },
        { name: "charlie" },
      ])
    })

    it("sorts data with empty values last when `emptyOrder` is set to 'last'", () => {
      const data = [
        { name: "alice" },
        { name: null },
        { name: "Bob" },
        { name: "charlie" },
        { name: "" },
        { name: undefined },
      ]
      const sort: DataProviderSortConfig = [
        {
          providerField: "name",
          direction: "asc",
          priority: 1,
          emptyOrder: "last",
        },
      ]
      const result = dataProviderSort(data, sort)

      expect(result).toEqual([
        { name: "alice" },
        { name: "Bob" },
        { name: "charlie" },
        { name: null },
        { name: "" },
        { name: undefined },
      ])
    })
  })

  it("sorts data based on providerGroup fields when lastName is the same", () => {
    const data = [
      { firstName: "Alice", lastName: "Smith" },
      { firstName: "Charlie", lastName: "Smith" },
      { firstName: "Bob", lastName: "Smith" },
    ]

    const sort: DataProviderSortConfig = [
      {
        providerGroup: ["lastName", "firstName"],
        direction: "asc",
        priority: 1,
      },
    ]

    const result = dataProviderSort(data, sort)

    expect(result).toEqual([
      { firstName: "Alice", lastName: "Smith" },
      { firstName: "Bob", lastName: "Smith" },
      { firstName: "Charlie", lastName: "Smith" },
    ])
  })

  it("sorts data based on multiple fields with different priorities", () => {
    const data = [
      { name: "Alice", age: "30" },
      { name: "Alice", age: "25" },
      { name: "Bob", age: "20" },
    ]
    const sort: DataProviderSortConfig = [
      { providerField: "name", direction: "asc", priority: 1 },
      { providerField: "age", direction: "asc", priority: 2 },
    ]
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([
      { name: "Alice", age: "25" },
      { name: "Alice", age: "30" },
      { name: "Bob", age: "20" },
    ])
  })

  it("sorts incomplete data based on multiple fields with different priorities", () => {
    const data = [
      { name: "Bob", surname: "Smith" },
      { name: "Alice" },
      { name: "Alice", surname: "Smith" },
    ]
    const sort: DataProviderSortConfig = [
      { providerField: "name", direction: "asc", priority: 2 },
      { providerField: "surname", direction: "asc", priority: 1 },
    ]
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([
      {
        name: "Alice",
        surname: "Smith",
      },
      {
        name: "Bob",
        surname: "Smith",
      },
      {
        name: "Alice",
      },
    ])
  })

  it("sorts data based on ordering patterns ", () => {
    const data = [
      { name: "Charlie" },
      { name: "Bob" },
      { name: "Alice" },
      { name: "Beatrice" },
    ]
    const sort: DataProviderSortConfig = [
      {
        providerField: "name",
        direction: "asc",
        priority: 1,
        orderingPatterns: ["/^B/m"],
      },
    ]
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([
      { name: "Beatrice" },
      { name: "Bob" },
      { name: "Alice" },
      { name: "Charlie" },
    ])
  })

  it("returns empty array when data is empty", () => {
    const data: Record<string, unknown>[] = []
    const sort: DataProviderSortConfig = [
      { providerField: "name", direction: "asc", priority: 1 },
    ]
    const result = dataProviderSort(data, sort)
    expect(result).toEqual([])
  })

  it("handles undefined data", () => {
    const sort: DataProviderSortConfig = [
      { providerField: "name", direction: "asc", priority: 1 },
    ]
    const result = dataProviderSort(undefined, sort)
    expect(result).toEqual([])
  })

  it("handles undefined sort configuration", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataProviderSort(data, undefined)
    expect(result).toEqual(data)
  })

  it("handles empty sort configuration", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const sort = [] as DataProviderSortConfig
    const result = dataProviderSort(data, sort)
    expect(result).toEqual(data)
  })

  it("returns unsorted data when neither `providerField` nor `providerGroup` is provided", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]

    const sortConfig: DataProviderSortConfig = [
      {
        priority: 1,
        direction: "asc",
      },
    ]

    const result = dataProviderSort(data, sortConfig)

    expect(result).toEqual(data)
  })
})
