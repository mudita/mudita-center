/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { filterRecordsByPhrase } from "Core/utils/filter-records-by-phrase"

type Animal = {
  id: number
  species: string
  kind: string
  legs: number
}

const animals: Animal[] = [
  { id: 1, species: "Żaba wodna", kind: "Pelophylax", legs: 4 },
  { id: 2, species: "Jaszczurka zwinka", kind: "Lacerta", legs: 4 },
  { id: 3, species: "Wąż zbożowy", kind: "Pantherophis", legs: 0 },
  { id: 4, species: "Berneński pies pasterski", kind: "Pies", legs: 4 },
]

test("filter by phrase - no data", () => {
  const filtered = filterRecordsByPhrase<Animal>([], "Pies", [
    "species",
    "kind",
  ])

  expect(filtered).toStrictEqual<Animal[]>([])
})

test("filter by phrase - empty phrase", () => {
  const filtered = filterRecordsByPhrase<Animal>(animals, "", [
    "species",
    "kind",
  ])

  expect(filtered).toStrictEqual<Animal[]>([
    { id: 1, species: "Żaba wodna", kind: "Pelophylax", legs: 4 },
    { id: 2, species: "Jaszczurka zwinka", kind: "Lacerta", legs: 4 },
    { id: 3, species: "Wąż zbożowy", kind: "Pantherophis", legs: 0 },
    { id: 4, species: "Berneński pies pasterski", kind: "Pies", legs: 4 },
  ])
})

test("filter by phrase - 1 result", () => {
  const filtered = filterRecordsByPhrase<Animal>(animals, "Pies", [
    "species",
    "kind",
  ])

  expect(filtered).toStrictEqual<Animal[]>([
    { id: 4, species: "Berneński pies pasterski", kind: "Pies", legs: 4 },
  ])
})

test("filter by phrase - more than 1 result", () => {
  const filtered = filterRecordsByPhrase<Animal>(animals, "Pa", [
    "species",
    "kind",
  ])

  expect(filtered).toStrictEqual<Animal[]>([
    { id: 3, species: "Wąż zbożowy", kind: "Pantherophis", legs: 0 },
    { id: 4, species: "Berneński pies pasterski", kind: "Pies", legs: 4 },
  ])
})

const kindEndsWithS = ({ kind }: Animal, _: string) => {
  if (kind[kind.length - 1].toLowerCase() === "s") {
    return true
  }
  return false
}

test("filter by phrase with additional check - are results", () => {
  const filtered = filterRecordsByPhrase<Animal>(
    animals,
    "Pant",
    ["species"],
    [kindEndsWithS]
  )

  expect(filtered).toStrictEqual<Animal[]>([
    { id: 3, species: "Wąż zbożowy", kind: "Pantherophis", legs: 0 },
    { id: 4, species: "Berneński pies pasterski", kind: "Pies", legs: 4 },
  ])
})

const kindEndsWithY = ({ kind }: Animal, _: string) => {
  if (kind[kind.length - 1].toLowerCase() === "y") {
    return true
  }
  return false
}

test("filter by phrase with additional check - no results", () => {
  const filtered = filterRecordsByPhrase<Animal>(
    animals,
    "Patataj",
    ["species"],
    [kindEndsWithY]
  )

  expect(filtered).toStrictEqual<Animal[]>([])
})
