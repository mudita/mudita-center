import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.contacts}`)
})

test("contact details are evoked when a user clicks on any contact", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
  await app.client.$(`*[data-testid='contact-row']`).click()
  expect(await app.client.isExisting(`*[data-testid='sidebar']`)).toBe(true)
})

test("should ", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Contacts}]`).click()
})
