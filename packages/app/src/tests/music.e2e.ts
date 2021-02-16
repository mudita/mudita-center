/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"

let app: any

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid=icon-Close]`).click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Music}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})
// TODO: Unskipp when view will be available in prod app
test.skip("menu button takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Music}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.music}`)
})
