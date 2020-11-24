import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_TABS, URL_MAIN } from "Renderer/constants/urls"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.enum"

let app: any
const testText = "essa"

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).click()
  await app.client.$(`*[data-testid="icon-Templates"]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.messages}${URL_TABS.templates}`)
})

test("user can open the text editor", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).click()
  await app.client.$(`*[data-testid="icon-Templates"]`).click()
  expect(
    await app.client.isVisible(`*[data-testid=${TemplatesTestIds.TextEditor}]`)
  ).toBe(false)
  await app.client
    .$(`*[data-testid=${TemplatesTestIds.AddTemplateButton}]`)
    .click()
  expect(
    await app.client.isVisible(`*[data-testid=${TemplatesTestIds.TextEditor}]`)
  ).toBe(true)
})

test("user can add value to the text area", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).click()
  await app.client.$(`*[data-testid="icon-Templates"]`).click()
  expect(
    await app.client.isVisible(`*[data-testid=${TemplatesTestIds.TextEditor}]`)
  ).toBe(false)
  await app.client
    .$(`*[data-testid=${TemplatesTestIds.AddTemplateButton}]`)
    .click()
  await app.client.$(`textarea`).click()
  await app.client.$(`textarea`).setValue(testText)
  expect(await app.client.$("textarea").getValue()).toBe(testText)
})
