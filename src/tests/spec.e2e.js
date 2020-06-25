const hooks = require("./hooks")

describe("Sample Test", () => {
  let app

  beforeEach(async () => {
    app = await hooks.startApp()
  })

  afterEach(async () => {
    await hooks.stopApp(app)
  })

  test("opens a window", async () => {
    const count = await app.client.waitUntilWindowLoaded().getWindowCount()
    expect(count).toEqual(1)
  })
  test("should ", async () => {
    const a = await app.client.getTagName(
      "*[data-testid='icon-MuditaLogoWithText']"
    )
    expect(a).toEqual("div")
  })
})
