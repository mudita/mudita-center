import { startApp, stopApp } from "App/tests/hooks"
import { PhoneTestIds } from "Renderer/components/rest/overview/phone/phone-test-ids.enum"
import localeEn from "Renderer/locales/main/en-US.json"

describe("Overview", () => {
  let app: any

  beforeEach(async () => {
    app = await startApp()
  }, 10000)

  afterEach(async () => {
    await stopApp(app)
  }, 10000)

  test("after clicking disconnect button, part of menu is not displayed", async () => {
    const overviewText = await app.client.getText("*[data-testid='location']")
    expect(overviewText).toEqual(localeEn["view.name.overview"])
    const pureMenu = await app.client.isExisting(
      "*[data-testid='menu.header.yourPure']"
    )
    expect(pureMenu).toBeTruthy()
    await app.client
      .$(`*[data-testid=${PhoneTestIds.DisconnectButton}]`)
      .click()
    expect(
      await app.client.isExisting("*[data-testid='menu.header.yourPure']")
    ).toBeFalsy()
  })
})
