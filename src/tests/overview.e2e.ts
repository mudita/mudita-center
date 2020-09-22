import { startApp, stopApp } from "App/tests/hooks"
import { PhoneTestIds } from "Renderer/components/rest/overview/phone/phone-test-ids.enum"
import localeEn from "Renderer/locales/default/en-US.json"
import { ButtonTogglerTestIds } from "Renderer/components/core/button-toggler/button-toggler-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("after clicking disconnect button, part of menu is not displayed", async () => {
  const overviewText = await app.client.getText("*[data-testid='location']")
  expect(overviewText).toEqual(localeEn["view.name.overview"])
  const pureMenu = await app.client.isExisting(
    "*[data-testid='menu.header.yourPure']"
  )
  expect(pureMenu).toBeTruthy()
  await app.client.$(`*[data-testid=${PhoneTestIds.DisconnectButton}]`).click()
  expect(
    await app.client.isExisting("*[data-testid='menu.header.yourPure']")
  ).toBeFalsy()
})

test("button toggler changes sim correctly", async () => {
  await app.client.isExisting("*[data-testid='location']")
  const previouslyInactiveSim = await app.client
    .$(`*[data-state=${ButtonTogglerTestIds.InactiveState}]`)
    .getText()
  await app.client
    .$(`*[data-state=${ButtonTogglerTestIds.InactiveState}]`)
    .click()
  const activeSimNow = await app.client
    .$(`*[data-state=${ButtonTogglerTestIds.ActiveState}]`)
    .getText()
  expect(activeSimNow).toEqual(previouslyInactiveSim)
})
