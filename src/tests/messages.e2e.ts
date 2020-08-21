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

  // console.log(input)
  const phoneNumber = await app.client
    .$(`*[data-testid='message-row']`)
    .$("p")
    .getText()
  const input = await app.client.$(`input[type='search']`).setValue(phoneNumber)
  const inputValue = input.getValue()
  console.log(inputValue)
})
