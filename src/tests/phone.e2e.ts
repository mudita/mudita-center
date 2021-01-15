import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { Type, getEnumName } from "Renderer/components/core/icon/icon.config"
import { URL_MAIN } from "Renderer/constants/urls"
import { OnboardingWelcomeTestIds } from "Renderer/components/rest/onboarding/onboarding-welcome-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp(true)
  await app.client
    .$(`*[data-testid=${OnboardingWelcomeTestIds.SimulatePhoneButton}]`)
    .click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Phone}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test("menu button takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Phone}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.phone}`)
})

test("receiving calls filter works correctly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Phone}]`).click()
  await app.client.$(`*[data-testid=${VisibilityFilter.Received}]`).click()
  expect(
    await app.client.isExisting(
      `*[data-testid='icon-${getEnumName(Type.IncomingCall)}']`
    )
  ).toBeTruthy()
  expect(
    await app.client.isExisting(
      `*[data-testid='icon-${getEnumName(Type.MissedCall)}']`
    )
  ).toBeFalsy()
  expect(
    await app.client.isExisting(
      `*[data-testid='icon-${getEnumName(Type.ConferenceCall)}']`
    )
  ).toBeFalsy()
})

test("missed calls filter works correctly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Phone}]`).click()
  await app.client.$(`*[data-testid=${VisibilityFilter.Missed}]`).click()
  expect(
    await app.client.isExisting(
      `*[data-testid='icon-${getEnumName(Type.MissedCall)}']`
    )
  ).toBeTruthy()
  expect(
    await app.client.isExisting(
      `*[data-testid='icon-${getEnumName(Type.IncomingCall)}']`
    )
  ).toBeFalsy()
  expect(
    await app.client.isExisting(
      `*[data-testid='icon-${getEnumName(Type.ConferenceCall)}']`
    )
  ).toBeFalsy()
})
