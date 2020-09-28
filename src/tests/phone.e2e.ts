import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import localeEn from "Renderer/locales/default/en-US.json"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { Type, getEnumName } from "Renderer/components/core/icon/icon.config"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu button takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Phone}]`).click()
  expect(await app.client.getText("*[data-testid='location']")).toEqual(
    localeEn["view.name.phone"]
  )
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
