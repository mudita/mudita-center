import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_TABS, URL_MAIN } from "Renderer/constants/urls"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.enum"

let app: any
const testText = "Mudita"

beforeEach(async () => {
  app = await startApp(true)
  await enablePhoneSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test.skip("menu takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).click()
  await app.client.$(`*[data-testid="icon-Templates"]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.messages}${URL_TABS.templates}`)
})

test.skip("user can open the text editor", async () => {
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

test.skip("user can add value to the text area", async () => {
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
