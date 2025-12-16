/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { clearQuotationMarks } from "./clear-quotation-marks"

describe("clearQuotationMarks", () => {
  it("should remove surrounding double quotation marks", () => {
    const input = '"Hello, World!"'
    const result = clearQuotationMarks(input)
    expect(result).toBe("Hello, World!")
  })

  it("should remove surrounding single quotation marks", () => {
    const input = "'Hello, World!'"
    const result = clearQuotationMarks(input)
    expect(result).toBe("Hello, World!")
  })

  it("should not remove quotation marks if only one side is quoted", () => {
    const input = '"Hello, World!'
    const result = clearQuotationMarks(input)
    expect(result).toBe('"Hello, World!')
  })

  it("should not remove quotation marks if they are not surrounding the string", () => {
    const input = '"He said", "Hello, World!"'
    const result = clearQuotationMarks(input)
    expect(result).toBe('"He said", "Hello, World!"')
  })

  it("should trim whitespace before checking for quotation marks", () => {
    const input = '   "Hello, World!"   '
    const result = clearQuotationMarks(input)
    expect(result).toBe("Hello, World!")
  })

  it("should return the original string if there are no surrounding quotation marks", () => {
    const input = "Hello, World!"
    const result = clearQuotationMarks(input)
    expect(result).toBe("Hello, World!")
  })

  it("should handle empty strings", () => {
    const input = ""
    const result = clearQuotationMarks(input)
    expect(result).toBe("")
  })

  it("should handle strings with only quotation marks", () => {
    const input = '""'
    const result = clearQuotationMarks(input)
    expect(result).toBe("")
  })

  it("should handle strings with only single quotation marks", () => {
    const input = "''"
    const result = clearQuotationMarks(input)
    expect(result).toBe("")
  })
})
