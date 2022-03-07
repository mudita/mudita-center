/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexFactory } from "./index.factory"

const subject = new IndexFactory()

describe("Method: create", () => {
  test("returns empty map", () => {
    const result = subject.create()

    expect(result).toEqual(new Map())
    expect(result.size).toEqual(0)
  })
})
