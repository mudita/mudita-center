import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"
import localeEn from "Renderer/locales/default/en-US.json"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu button takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.meditation}`)
})

test("initial filter is set to weekly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
})

test("should ", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  await app.client.isVisible(`//*[text()=${localeEn["view.generic.yearly"]}]`)
  await app.client.$(`//*[text()=${localeEn["view.generic.yearly"]}]`).click()
})
