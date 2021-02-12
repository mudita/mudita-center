import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"
import localeEn from "Renderer/locales/default/en-US.json"

let app: any

beforeEach(async () => {
  app = await startApp(true)
  await enablePhoneSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test.skip("menu button takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.meditation}`)
})

test.skip("initial filter is set to weekly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
})

test.skip("filter can be changed back to weekly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
  await app.client
    .$(`//button[p[text()='${localeEn["view.generic.monthly"]}']]`)
    .click()
  await app.client
    .$(`//button[p[text()='${localeEn["view.generic.weekly"]}']]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
})

test.skip("filter can be changed to monthly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  await app.client
    .$(`//button[p[text()='${localeEn["view.generic.monthly"]}']]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeTruthy()
})

test.skip("filter can be changed to yearly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  await app.client
    .$(`//button[p[text()='${localeEn["view.generic.yearly"]}']]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeTruthy()
})
