const hooks = require("./hooks")

describe("Sample Test", () => {
  let app

  beforeEach(async () => {
    app = await hooks.startApp()
  })

  afterEach(async () => {
    await hooks.stopApp(app)
  })

  it("opens a window", async () => {
    await app.client.waitUntilWindowLoaded().getWindowCount()
  })
})
