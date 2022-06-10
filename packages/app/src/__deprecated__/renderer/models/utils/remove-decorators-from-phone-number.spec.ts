/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { removeDecoratorsFromPhoneNumber } from "App/__deprecated__/renderer/models/utils/remove-decorators-from-phone-number"

describe("`removeDecoratorsFromPhoneNumber` util", () => {
  describe("when the `phoneNumber` is a numeric", () => {
    test("`phoneNumber` with spaces is equal to 'raw' `phoneNumber`", () => {
      expect(removeDecoratorsFromPhoneNumber("33 999 999 999")).toEqual(
        "33999999999"
      )
    })

    test("`phoneNumber` with multiple spaces is equal to 'raw' `phoneNumber`", () => {
      expect(
        removeDecoratorsFromPhoneNumber("   33    999     999    9 99   ")
      ).toEqual("33999999999")
    })

    test("`phoneNumber` with '+' and spaces is equal to 'raw' `phoneNumber`", () => {
      expect(removeDecoratorsFromPhoneNumber("+33 999 999 999")).toEqual(
        "33999999999"
      )
    })

    test("helper return no numeric `phoneNumber` properly", () => {
      expect(removeDecoratorsFromPhoneNumber("play")).toEqual("play")
    })
  })

  describe("when the `phoneNumber` isn't a numeric", () => {
    test("shouldn't replace a characters", () => {
      expect(removeDecoratorsFromPhoneNumber("play")).toEqual("play")
    })

    test("should escape space", () => {
      expect(removeDecoratorsFromPhoneNumber("   play   ")).toEqual("play")
    })

    test("should transform text to lower case", () => {
      expect(removeDecoratorsFromPhoneNumber("   PLAY   ")).toEqual("play")
    })
  })
})
