import { startApp, stopApp } from "App/tests/hooks"

describe("Sample Test", () => {
  let app: any

  beforeEach(async () => {
    app = await startApp()
  }, 10000)

  afterEach(async () => {
    await stopApp(app)
  }, 10000)

  test("", async () => {
    const overviewText = await app.client.getText("*[data-testid='location']")
    expect(overviewText).toEqual("Overview")

    const pureMenu = await app.client.isExisting(
      "*[data-testid='menu.header.yourPure']"
    )
    expect(pureMenu).toBeTruthy()
  })
})
