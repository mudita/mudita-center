import { startApp, stopApp } from "App/tests/hooks"
import { MenuGropTestIds } from "Renderer/components/rest/menu/menu-grop-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("cos", async () => {
  await app.client.$(`*[data-testid=${MenuGropTestIds.Messages}]`).click()
  const phoneNumber = await app.client
    .$(`*[data-testid='message-row']`)
    .$("p")
    .getText()
  await app.client.$("input").setValue(phoneNumber)
  const rows = await app.client.$$(`*[data-testid='message-row']`)
  expect(rows).toHaveLength(1)
})
