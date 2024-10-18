/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { stringToRegex } from "./string-to-regex"

describe("stringToRegex", () => {
  it("converts valid regex string with options", () => {
    const regex = stringToRegex("/abc/i")
    expect(regex).toEqual(new RegExp("abc", "i"))
  })

  it("converts valid regex string without options", () => {
    const regex = stringToRegex("/abc/")
    expect(regex).toEqual(new RegExp("abc"))
  })

  it("throws error for invalid regex string", () => {
    expect(() => stringToRegex("abc")).toThrow("Invalid regex")
  })

  it("throws error for empty string", () => {
    expect(() => stringToRegex("")).toThrow("Invalid regex")
  })

  it("throws error for undefined input", () => {
    expect(() => stringToRegex(undefined)).toThrow("Invalid regex")
  })
})
