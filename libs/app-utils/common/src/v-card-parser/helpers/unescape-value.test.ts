/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { unescapeValue } from "./unescape-value"

describe("unescapeValue", () => {
  it("unescapes a semicolon", () => {
    expect(unescapeValue("Example Org\\; Inc.")).toBe("Example Org; Inc.")
  })

  it("unescapes a comma", () => {
    expect(unescapeValue("1 Example St.\\, Apt 1")).toBe("1 Example St., Apt 1")
  })

  it("unescapes a backslash", () => {
    expect(unescapeValue("back\\\\slash")).toBe("back\\slash")
  })

  it("turns an escaped n into a new line", () => {
    expect(unescapeValue("line one\\nline two")).toBe("line one\nline two")
  })

  it("turns an escaped capital N into a new line", () => {
    expect(unescapeValue("line one\\Nline two")).toBe("line one\nline two")
  })

  it("resolves each escape once, so an escaped backslash stays one", () => {
    expect(unescapeValue("C:\\\\new")).toBe("C:\\new")
  })

  it("leaves an unknown escape sequence untouched", () => {
    expect(unescapeValue("100\\% sure")).toBe("100\\% sure")
  })

  it("leaves a value without escapes untouched", () => {
    expect(unescapeValue("plain value")).toBe("plain value")
  })

  it("handles an empty value", () => {
    expect(unescapeValue()).toBe("")
  })
})
