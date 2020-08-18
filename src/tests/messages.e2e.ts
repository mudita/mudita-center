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
  // const input = await app.client.$(`input[type='search']`)
  // console.log(input)
  const rows = await app.client.$(`*[data-testid='message-row']`)
  console.log(rows.getText())
})
