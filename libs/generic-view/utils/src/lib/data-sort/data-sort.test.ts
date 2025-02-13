/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataSort } from "./data-sort"
import { DataSortConfig } from "device/models"

describe("dataProviderSort", () => {
  it("returns all data when no sort configuration is provided", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataSort(data)
    expect(result).toEqual(data)
  })

  it("sorts data based on single field in ascending order", () => {
    const data = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }]
    const sort = [
      { field: "name", direction: "asc", priority: 1 },
    ] as DataSortConfig
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ])
  })

  it("sorts data based on single field in descending order", () => {
    const data = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }]
    const sort: DataSortConfig = [
      { field: "name", direction: "desc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "Charlie" },
      { name: "Bob" },
      { name: "Alice" },
    ])
  })

  it("sorts data with leading and trailing spaces in ascending order", () => {
    const data = [
      { name: " Alice" },
      { name: "Bob " },
      { name: " Charlie " },
      { name: "a" },
    ]
    const sort: DataSortConfig = [
      { field: "name", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "a" },
      { name: " Alice" },
      { name: "Bob " },
      { name: " Charlie " },
    ])
  })

  it("sorts data with leading and trailing spaces in descending order", () => {
    const data = [
      { name: " Alice" },
      { name: "Bob " },
      { name: " Charlie " },
      { name: "a" },
    ]
    const sort: DataSortConfig = [
      { field: "name", direction: "desc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: " Charlie " },
      { name: "Bob " },
      { name: " Alice" },
      { name: "a" },
    ])
  })

  it("sorts data with mixed spaces correctly", () => {
    const data = [
      { name: " a1" },
      { name: "a " },
      { name: " a" },
      { name: "b" },
    ]
    const sort: DataSortConfig = [
      { field: "name", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "a " },
      { name: " a" },
      { name: " a1" },
      { name: "b" },
    ])
  })

  it("sorts data with empty and whitespace-only strings", () => {
    const data = [
      { name: "   " },
      { name: " Alice" },
      { name: "Bob " },
      { name: "" },
    ]
    const sort: DataSortConfig = [
      { field: "name", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: " Alice" },
      { name: "Bob " },
      { name: "   " },
      { name: "" },
    ])
  })

  it("sorts data based on nested field in ascending order", () => {
    const data = [
      { user: { name: "Charlie" } },
      { user: { name: "Alice" } },
      { user: { name: "Bob" } },
    ]
    const sort: DataSortConfig = [
      { field: "user.name", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { user: { name: "Alice" } },
      { user: { name: "Bob" } },
      { user: { name: "Charlie" } },
    ])
  })

  it("sorts data with numeric values as primitive numbers", () => {
    const data = [
      { user: { age: 30 } },
      { user: { age: 40 } },
      { user: { age: 25 } },
    ]
    const sort: DataSortConfig = [
      { field: "user.age", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { user: { age: 25 } },
      { user: { age: 30 } },
      { user: { age: 40 } },
    ])
  })

  it("sorts numeric values correctly without converting them to strings", () => {
    const data = [
      { value: 3 },
      { value: 300 },
      { value: 25 },
      { value: 100 },
      { value: 5 },
    ]
    const sort: DataSortConfig = [
      { field: "value", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)

    expect(result).toEqual([
      { value: 3 },
      { value: 5 },
      { value: 25 },
      { value: 100 },
      { value: 300 },
    ])
  })

  it("sorts numeric values represented as strings in ascending alphanumeric order", () => {
    const data = [
      { value: "3" },
      { value: "300" },
      { value: "25" },
      { value: "100" },
      { value: "5" },
    ]
    const sort: DataSortConfig = [
      { field: "value", direction: "asc", priority: 1 },
    ]

    const result = dataSort(data, sort)

    expect(result).toEqual([
      { value: "100" },
      { value: "25" },
      { value: "3" },
      { value: "300" },
      { value: "5" },
    ])
  })

  it("sorts strings before numbers with strings in lexicographical order and numbers in ascending order", () => {
    const data = [
      { value: "Bob" },
      { value: 1 },
      { value: 3 },
      { value: "Alice" },
      { value: 2 },
    ]
    const sort: DataSortConfig = [
      { field: "value", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)

    expect(result).toEqual([
      { value: "Alice" },
      { value: "Bob" },
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ])
  })

  it("sorts data based on multiple fields with different priorities", () => {
    const data = [
      { name: "Alice", age: "30" },
      { name: "Alice", age: "25" },
      { name: "Bob", age: "20" },
    ]
    const sort: DataSortConfig = [
      { field: "name", direction: "asc", priority: 1 },
      { field: "age", direction: "asc", priority: 2 },
    ]
    const result = dataSort(data, sort)
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
    const sort: DataSortConfig = [
      { field: "surname", direction: "asc", priority: 1 },
      { field: "name", direction: "asc", priority: 2 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "Alice", surname: "Smith" },
      { name: "Bob", surname: "Smith" },
      { name: "Alice" },
    ])
  })

  it("sorts data with sensitivity set to 'base' (ignores case and accents)", () => {
    const data = [
      { name: "alice" },
      { name: "álice" },
      { name: "Bob" },
      { name: "charlie" },
      { name: "Alice" },
    ]
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        sensitivity: "base",
      },
    ]
    const result = dataSort(data, sort)

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
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        sensitivity: "accent",
      },
    ]
    const result = dataSort(data, sort)

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
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        sensitivity: "case",
      },
    ]
    const result = dataSort(data, sort)
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
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        sensitivity: "variant",
      },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "alice" },
      { name: "Alice" },
      { name: "álice" },
      { name: "Bob" },
      { name: "charlie" },
    ])
  })

  it("sorts data with empty values first when `emptyOrder` is set to 'first'", () => {
    const data = [
      { name: "alice" },
      { name: null },
      { name: "Bob" },
      { name: "charlie" },
      { name: "" },
      { name: undefined },
    ]
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        emptyOrder: "first",
      },
    ]
    const result = dataSort(data, sort)

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
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        emptyOrder: "last",
      },
    ]
    const result = dataSort(data, sort)

    expect(result).toEqual([
      { name: "alice" },
      { name: "Bob" },
      { name: "charlie" },
      { name: null },
      { name: "" },
      { name: undefined },
    ])
  })

  it("sorts data based on fieldGroup fields when lastName is the same", () => {
    const data = [
      { firstName: "Alice", lastName: "Smith" },
      { firstName: "Charlie", lastName: "Smith" },
      { firstName: "Bob", lastName: "Smith" },
    ]

    const sort: DataSortConfig = [
      {
        fieldGroup: ["lastName", "firstName"],
        direction: "asc",
        priority: 1,
      },
    ]

    const result = dataSort(data, sort)

    expect(result).toEqual([
      { firstName: "Alice", lastName: "Smith" },
      { firstName: "Bob", lastName: "Smith" },
      { firstName: "Charlie", lastName: "Smith" },
    ])
  })

  it("handles sorting when lastName is empty and firstName is used", () => {
    const data = [
      { firstName: "Alice", lastName: "" },
      { firstName: "Bob", lastName: "" },
      { firstName: "Charlie", lastName: "Smith" },
    ]

    const sortConfig: DataSortConfig = [
      {
        fieldGroup: ["lastName", "firstName"],
        priority: 1,
        direction: "asc",
      },
    ]

    const result = dataSort(data, sortConfig)
    expect(result).toEqual([
      { firstName: "Alice", lastName: "" },
      { firstName: "Bob", lastName: "" },
      { firstName: "Charlie", lastName: "Smith" },
    ])
  })

  it("sorts data with empty fieldGroup values first when emptyOrder is 'first'", () => {
    const data = [
      { firstName: "Bob", lastName: "Smith", displayName: "Bob Smith" },
      { firstName: "Alice", lastName: null, displayName: "Alice" },
      { firstName: "Yuki", lastName: null, displayName: "Yuki" },
      { firstName: undefined, lastName: undefined, displayName: "Dave" },
      { firstName: "Charlie", lastName: "", displayName: "Charlie" },
    ]

    const sortConfig: DataSortConfig = [
      {
        fieldGroup: ["lastName", "firstName"],
        priority: 1,
        direction: "asc",
        emptyOrder: "first",
      },
    ]

    const result = dataSort(data, sortConfig)
    expect(result).toEqual([
      { firstName: undefined, lastName: undefined, displayName: "Dave" },
      { firstName: "Alice", lastName: null, displayName: "Alice" },
      { firstName: "Charlie", lastName: "", displayName: "Charlie" },
      { firstName: "Bob", lastName: "Smith", displayName: "Bob Smith" },
      { firstName: "Yuki", lastName: null, displayName: "Yuki" },
    ])
  })

  it("sorts data with empty fieldGroup values last when emptyOrder is 'last'", () => {
    const data = [
      { firstName: "Bob", lastName: "Smith", displayName: "Bob Smith" },
      { firstName: "Alice", lastName: null, displayName: "Alice" },
      { firstName: undefined, lastName: undefined, displayName: "Dave" },
      { firstName: "Charlie", lastName: "", displayName: "Charlie" },
      { firstName: "Yuki", lastName: null, displayName: "Yuki" },
    ]

    const sortConfig: DataSortConfig = [
      {
        fieldGroup: ["lastName", "firstName"],
        priority: 1,
        direction: "asc",
        emptyOrder: "last",
      },
    ]

    const result = dataSort(data, sortConfig)
    expect(result).toEqual([
      { firstName: "Alice", lastName: null, displayName: "Alice" },
      { firstName: "Charlie", lastName: "", displayName: "Charlie" },
      { firstName: "Bob", lastName: "Smith", displayName: "Bob Smith" },
      { firstName: "Yuki", lastName: null, displayName: "Yuki" },
      { firstName: undefined, lastName: undefined, displayName: "Dave" },
    ])
  })

  it("sorts data based on ordering patterns", () => {
    const data = [
      { name: "Charlie" },
      { name: "Bob" },
      { name: "Alice" },
      { name: "Beatrice" },
    ]
    const sort: DataSortConfig = [
      {
        field: "name",
        direction: "asc",
        priority: 1,
        orderingPatterns: ["/^B/m"],
      },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([
      { name: "Beatrice" },
      { name: "Bob" },
      { name: "Alice" },
      { name: "Charlie" },
    ])
  })

  it("sorts data using orderingPatterns for alphabetical, numeric, and special character fields", () => {
    const data = [
      { displayName: "Anna", firstName: "Anna", lastName: "" },
      { displayName: "490123456789", firstName: "", lastName: "" },
      { displayName: "+48345678902", firstName: "", lastName: "" },
      { displayName: "Michael", firstName: "Michael", lastName: "Brown" },
      { displayName: "home@home.com", firstName: "", lastName: "" },
    ]

    const sortConfig: DataSortConfig = [
      {
        fieldGroup: ["displayName"],
        priority: 1,
        direction: "asc",
        orderingPatterns: [
          "/^\\p{L}.*/u", // first alphabetical values
          "/^\\d+$/", // then numeric values
          "/^[^a-zA-Z\\d\\s@]+$/", // then special characters (non-alphanumeric)
        ],
        sensitivity: "variant",
      },
    ]

    const result = dataSort(data, sortConfig)
    expect(result).toEqual([
      { displayName: "Anna", firstName: "Anna", lastName: "" },
      { displayName: "home@home.com", firstName: "", lastName: "" },
      { displayName: "Michael", firstName: "Michael", lastName: "Brown" },
      { displayName: "490123456789", firstName: "", lastName: "" },
      { displayName: "+48345678902", firstName: "", lastName: "" },
    ])
  })

  it("sorts complex data using `fieldGroup` and `orderingPatterns`, handling empty and numeric values", () => {
    const data = [
      { displayName: "Anna", firstName: "Anna", lastName: "" },
      { displayName: "+48345678902", firstName: "", lastName: "" },
      { displayName: "Michael", firstName: "Michael", lastName: "Brown" },
      { displayName: "Numer 12345", firstName: "Numer", lastName: "12345" },
    ]

    const sortConfig: DataSortConfig = [
      {
        fieldGroup: ["lastName", "firstName", "displayName"],
        priority: 1,
        direction: "asc",
        orderingPatterns: [
          "/^\\p{L}.*/u", // alphabetic first
          "/^\\d+$/", // numeric second
        ],
        sensitivity: "variant",
      },
    ]

    const result = dataSort(data, sortConfig)
    expect(result).toEqual([
      { displayName: "Anna", firstName: "Anna", lastName: "" },
      { displayName: "Michael", firstName: "Michael", lastName: "Brown" },
      { displayName: "Numer 12345", firstName: "Numer", lastName: "12345" },
      { displayName: "+48345678902", firstName: "", lastName: "" },
    ])
  })

  it("sorts data with phone numbers and empty lastName", () => {
    const data = [
      { displayName: "+48345678902", firstName: "", lastName: "" },
      { displayName: "Jane Smith", firstName: "Jane", lastName: "Smith" },
      { displayName: "490123456789", firstName: "", lastName: "" },
      { displayName: "Emily Davis", firstName: "Emily", lastName: "Davis" },
    ]

    const sortConfig: DataSortConfig = [
      {
        fieldGroup: ["lastName", "displayName"],
        priority: 1,
        direction: "asc",
        orderingPatterns: ["/^\\p{L}.*/u", "/^\\d+$/"],
        sensitivity: "variant",
      },
    ]

    const result = dataSort(data, sortConfig)
    expect(result).toEqual([
      { displayName: "Emily Davis", firstName: "Emily", lastName: "Davis" },
      { displayName: "Jane Smith", firstName: "Jane", lastName: "Smith" },
      { displayName: "490123456789", firstName: "", lastName: "" },
      { displayName: "+48345678902", firstName: "", lastName: "" },
    ])
  })

  it("returns empty array when data is empty", () => {
    const data: Record<string, unknown>[] = []
    const sort: DataSortConfig = [
      { field: "name", direction: "asc", priority: 1 },
    ]
    const result = dataSort(data, sort)
    expect(result).toEqual([])
  })

  it("handles undefined data", () => {
    const sort: DataSortConfig = [
      { field: "name", direction: "asc", priority: 1 },
    ]
    const result = dataSort(undefined, sort)
    expect(result).toEqual([])
  })

  it("handles undefined sort configuration", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const result = dataSort(data, undefined)
    expect(result).toEqual(data)
  })

  it("handles empty sort configuration", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }]
    const sort = [] as DataSortConfig
    const result = dataSort(data, sort)
    expect(result).toEqual(data)
  })

  it("returns unsorted data when neither `providerField` nor `fieldGroup` is provided", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 },
    ]
    const sortConfig: DataSortConfig = [
      {
        priority: 1,
        direction: "asc",
      },
    ]
    const result = dataSort(data, sortConfig)
    expect(result).toEqual(data)
  })
})
