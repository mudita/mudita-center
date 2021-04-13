/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { startApp, stopApp } from "App/tests/hooks"
import { Application } from "spectron";

let app: Application

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("opens a window, checks its count", async () => {
  await app.client.waitUntilWindowLoaded()
  const count = await app.client.getWindowCount()
  expect(count).toEqual(1)
})
