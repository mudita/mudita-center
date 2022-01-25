/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { displaySpace } from "App/files-manager/helpers/display-space"

const smallValue = 124
const biggerValue = 15000

describe("DisplaySpace", () => {
  test("DisplaySpace should return MB", () => {
    const result = displaySpace(smallValue)
    expect(result).toEqual("124 MB")
  })

  test("DisplaySpace should return GB", () => {
    const result = displaySpace(biggerValue)
    expect(result).toEqual("15.0 GB")
  })
})
