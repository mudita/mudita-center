/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { Application } from "spectron"

let app: Application

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid=icon-Close]`).click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

// FIXME: skipped until fix https://appnroll.atlassian.net/browse/CP-155
test.skip("help takes user to correct location", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).click()
  // @ts-ignore FIXME: windowHandles is deprecated and returns `never`.
  app.client.windowHandles().then((handles: any) => {
    const helpWindow = handles.values[1]
    app.client.window(helpWindow)
    const hash = app.client.execute(() => window.location.hash)
    expect(hash.value).toEqual(`#${URL_MAIN.help}`)
  })
})

test.skip("help link opens new window", async () => {
  await app.client.waitUntilWindowLoaded()
  const initialWindowCount = await app.client.getWindowCount()
  expect(initialWindowCount).toEqual(1)
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).click()
  await app.client.waitUntilWindowLoaded()
  const windowCountAfterHelpClick = await app.client.getWindowCount()
  expect(windowCountAfterHelpClick).toEqual(2)
})
