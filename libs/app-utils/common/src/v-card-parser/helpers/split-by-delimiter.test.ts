/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { splitByDelimiter } from "./split-by-delimiter"

describe("splitByDelimiter", () => {
  it("splits text by a single delimiter", () => {
    const result = splitByDelimiter("a,b,c", ",")
    expect(result).toEqual(["a", "b", "c"])
  })

  it("splits text by multiple delimiters", () => {
    const result = splitByDelimiter("a;b,c", [",", ";"])
    expect(result).toEqual(["a", "b", "c"])
  })

  it("does not split delimiters inside quotes", () => {
    const result = splitByDelimiter('a,"b,c",d', ",")
    expect(result).toEqual(["a", "b,c", "d"])
  })

  it("does not split escaped delimiters", () => {
    const result = splitByDelimiter("a,b\\,c,d", ",")
    expect(result).toEqual(["a", "b\\,c", "d"])
  })

  it("handles empty input", () => {
    const result = splitByDelimiter("", ",")
    expect(result).toEqual([""])
  })

  it("handles input with no delimiters", () => {
    const result = splitByDelimiter("abc", ",")
    expect(result).toEqual(["abc"])
  })

  it("handles input with only delimiters", () => {
    const result = splitByDelimiter(",,,", ",")
    expect(result).toEqual(["", "", "", ""])
  })

  it("handles nested quotes correctly", () => {
    const result = splitByDelimiter(`a,"b,'c,d'",e`, ",")
    expect(result).toEqual(["a", "b,'c,d'", "e"])
  })

  it("handles escaped quotes correctly", () => {
    const result = splitByDelimiter(`a,"b,\\"c,d\\"",e`, ",")
    expect(result).toEqual(["a", `b,\\"c,d\\"`, "e"])
  })
})
