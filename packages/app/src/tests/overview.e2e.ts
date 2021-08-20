/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { PhoneTestIds } from "App/overview/components/phone/phone-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { Application } from "spectron"

let app: Application

beforeEach(async () => {
  app = await startApp(true)
  await enablePhoneSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Overview}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test("app starts on the correct page", async () => {
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.overview}`)
})

test("after clicking disconnect button, part of menu is not displayed", async () => {
  expect(
    await app.client.isExisting("*[data-testid='component.menuHeaderYourPure']")
  ).toBeTruthy()
  await app.client.$(`*[data-testid=${PhoneTestIds.DisconnectButton}]`).click()
  expect(
    await app.client.isExisting("*[data-testid='component.menuHeaderYourPure']")
  ).toBeFalsy()
})
