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

describe("splitByDelimiter quote handling", () => {
  it("treats an apostrophe as ordinary content", () => {
    // RFC 6350 sec. 3.3 gives meaning to the double quote only, and a name
    // such as O'Connor must not swallow the delimiter after it.
    expect(splitByDelimiter("O'Connor;John;;;", ";")).toEqual([
      "O'Connor",
      "John",
      "",
      "",
      "",
    ])
  })

  it("keeps the quotes when stripping them is turned off", () => {
    expect(splitByDelimiter('a,"b,c",d', ",", { stripQuotes: false })).toEqual([
      "a",
      '"b,c"',
      "d",
    ])
  })

  it("splits inside quotes when quote awareness is off", () => {
    expect(splitByDelimiter('a,"b,c",d', ",", { quoteAware: false })).toEqual([
      "a",
      '"b',
      'c"',
      "d",
    ])
  })

  it("leaves a lone quotation mark alone", () => {
    expect(splitByDelimiter('a,",b', ",")).toEqual(["a", '",b'])
  })
})
