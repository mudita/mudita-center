/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import { SettingsTestIds } from "Renderer/modules/settings/settings.enum"
import { PhoneTestIds } from "App/overview/components/phone/phone-test-ids.enum"
import { Application } from "spectron"

let app: Application

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid=icon-Close]`).click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Tethering}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

// TODO: Unskipp all tests when view will be available in prod app
test.skip("menu takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tethering}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.tethering}`)
  expect(
    await app.client.isExisting(
      `*[data-testid=${TetheringTestIds.DisabledWrapper}]`
    )
  ).toBe(true)
})

test.skip("goto button takes a user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tethering}]`).click()
  await app.client.$(`*[data-testid=${TetheringTestIds.GoToButton}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.settings}`)
})

test.skip("user can toggle on tethering", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tethering}]`).click()
  await app.client
    .$(`*[data-testid=${SettingsTestIds.TogglerInactive}]`)
    .click()
  expect(
    await app.client.isExisting(
      `*[data-testid=${TetheringTestIds.EnabledWrapper}]`
    )
  ).toBe(true)
})

test.skip("user can see the phone disconnected screen after disconnecting the phone", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Overview}]`).click()
  await app.client.$(`*[data-testid=${PhoneTestIds.DisconnectButton}]`).click()
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Tethering}]`).click()
  expect(
    await app.client.isExisting(
      `*[data-testid=${TetheringTestIds.DisconnectedWrapper}]`
    )
  ).toBe(true)
})
