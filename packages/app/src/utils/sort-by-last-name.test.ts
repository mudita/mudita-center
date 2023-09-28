/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sortByLastNameAscending } from "App/utils/sort-by-last-name"

const people = [
  { name: "John", lastName: "Januszkowski" },
  { name: "Ryszard", lastName: "Dzałkowiecki" },
  { name: "Zazebiusz", lastName: "Abecadełkowy" },
]

type People2 = {
  name: string
  lastName?: string
}

const people2: People2[] = [
  {
    name: "Igor",
  },
  {
    name: "Franek",
  },
]

test("sort data with lastName field", () => {
  const sorted = [...people].sort(sortByLastNameAscending)
  expect(sorted).toStrictEqual<typeof people>([
    { name: "Zazebiusz", lastName: "Abecadełkowy" },
    { name: "Ryszard", lastName: "Dzałkowiecki" },
    { name: "John", lastName: "Januszkowski" },
  ])
})

test("sort data without lastName field - no sort", () => {
  const sorted = [...people2].sort(sortByLastNameAscending)
  expect(sorted).toStrictEqual<typeof people2>([
    { name: "Igor" },
    { name: "Franek" },
  ])
})
