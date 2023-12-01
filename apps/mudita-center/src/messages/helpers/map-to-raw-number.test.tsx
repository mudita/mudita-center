/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mapToRawNumber } from "App/messages/helpers/map-to-raw-number"

describe("`mapToRawNumber`", () => {
  test("when `New Conversion` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("New Conversion")).toEqual("New Conversion")
  })
  test("when `Big Sky Mobile` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("Big Sky Mobile")).toEqual("Big Sky Mobile")
  })
  test("when `(123) 456-7890` as string is pass the spaces is trimmed", () => {
    expect(mapToRawNumber("(123) 456-7890")).toEqual("(123)456-7890")
  })
  test("when `+48 600 700 800` as string is pass the spaces is trimmed", () => {
    expect(mapToRawNumber("+48 600 700 800")).toEqual("+48600700800")
  })
  test("when `600 700 800` as string is pass the spaces is trimmed", () => {
    expect(mapToRawNumber("600 700 800")).toEqual("600700800")
  })
  test("when `(123)456-7890` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("(123)456-7890")).toEqual("(123)456-7890")
  })
  test("when `123-456-7890` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("123-456-7890")).toEqual("123-456-7890")
  })
  test("when `123.456.7890` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("123.456.7890")).toEqual("123.456.7890")
  })
  test("when `1234567890` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("1234567890")).toEqual("1234567890")
  })
  test("when `+31636363634` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("+31636363634")).toEqual("+31636363634")
  })
  test("when `075-63546725` as string is pass the spaces isn't trimmed", () => {
    expect(mapToRawNumber("075-63546725")).toEqual("075-63546725")
  })
})
