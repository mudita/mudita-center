/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { browser } from "@wdio/globals"

describe("Electron Testing", () => {
  it("should print application title", async () => {
    await browser.url("/")
    console.log("Hello", await browser.getTitle(), "application!")
  })
})
