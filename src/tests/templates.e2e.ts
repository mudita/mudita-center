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

test("menu takes user to correct page", async () => {
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

test("menu takes user to correct page", async () => {
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

test("user can save the notes", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).click()
  await app.client.$(`*[data-testid="icon-Templates"]`).click()
  await app.client
    .$(`*[data-testid=${TemplatesTestIds.AddTemplateButton}]`)
    .click()
  await app.client.$(`textarea`).click()
  await app.client.$(`textarea`).setValue(testText)
  await app.client.$(`*[data-testid="save"`).click()
  expect(await app.client.$(`textarea`).getText()).toBe(testText)
  await app.client.$(`*[data-testid="icon-Close"`).click()
  expect(await app.client.$(`role="listitem"`).getText()).toBe(testText)
})
