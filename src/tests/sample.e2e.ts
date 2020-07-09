import { startApp, stopApp } from "App/tests/hooks"

describe("Sample Test", () => {
  let app: any

  beforeEach(async () => {
    app = await startApp()
  }, 10000)

  afterEach(async () => {
    await stopApp(app)
  }, 10000)

  test("opens a window, checks its count", async () => {
    const count = await app.client.waitUntilWindowLoaded().getWindowCount()
    expect(count).toEqual(1)
  })
  test("sample test for getting html element", async () => {
    const a = await app.client.getTagName(
      "*[data-testid='icon-MuditaLogoWithText']"
    )
    expect(a).toEqual("div")
  })
})
