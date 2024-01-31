/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mapLayoutSizes } from "./map-layout-sizes"

describe("mapLayoutSizes", () => {
  it("should properly map numbers", () => {
    expect(mapLayoutSizes([1, 2, 3])).toEqual("1fr 2fr 3fr")
  })

  it("should properly map stringified numbers", () => {
    expect(mapLayoutSizes(["1", "2", "3"])).toEqual("1fr 2fr 3fr")
  })

  it("should properly map strings", () => {
    expect(mapLayoutSizes(["1px", "2rem", "3%"])).toEqual("1px 2rem 3%")
  })

  it("should properly map mixed values", () => {
    expect(mapLayoutSizes(["1px", 2, "3%", "4", "auto"])).toEqual(
      "1px 2fr 3% 4fr auto"
    )
  })
})
