/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  getPropertyName,
  isExtensionProperty,
  isProperty,
} from "./property-name"

describe("getPropertyName", () => {
  it.each([
    ["tel:123", "TEL"],
    ["TEL;TYPE=home:123", "TEL"],
    ['ADR;LABEL="Room 1; Building A: north":;;Main St.;;;;', "ADR"],
    ['NOTE:contains; a colon: and an unmatched "', "NOTE"],
    ["  fn :John Doe", "FN"],
    ["FN", "FN"],
    ["", ""],
  ])("reads the name from %s", (line, expected) => {
    expect(getPropertyName(line)).toBe(expected)
  })

  it("matches the complete property name", () => {
    expect(isProperty("N")("N:Doe;John;;;")).toBe(true)
    expect(isProperty("N")("NOTE:hello")).toBe(false)
    expect(isProperty("N")("NICKNAME:Johnny")).toBe(false)
  })

  it("recognizes an extension only in the property name", () => {
    expect(isExtensionProperty("x-custom;TYPE=home:hello")).toBe(true)
    expect(isExtensionProperty("NOTE:X-CUSTOM:hello")).toBe(false)
  })
})
