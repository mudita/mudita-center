/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { startApp, stopApp } from "App/tests/hooks"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("opens a window, checks its count", async () => {
  const count = await app.client.waitUntilWindowLoaded().getWindowCount()
  expect(count).toEqual(1)
})

test("icon should have i tag", async () => {
  const iconElement = await app.client.getTagName(
    "*[data-testid='icon-MuditaLogoWithText']"
  )
  expect(iconElement).toEqual("i")
})
