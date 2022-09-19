/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { versionFormatter } from "App/update/helpers/version-formatter.helper"

describe("Production release", () => {
  test("returns provided version", () => {
    expect(versionFormatter("1.2.3")).toEqual("1.2.3")
  })
})

describe("Release candidate release", () => {
  test("returns provided version", () => {
    expect(versionFormatter("1.2.3-rc.1")).toEqual("1.2.3-rc.1")
  })
})

describe("Daily release", () => {
  test("returns formatted version", () => {
    expect(versionFormatter("1.2.3-daily.2022.08.12")).toEqual(
      "1.2.3-daily.2022.8.12"
    )
  })
})
