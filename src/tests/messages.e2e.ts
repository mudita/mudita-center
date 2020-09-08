import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { MessagesListTestIds } from "Renderer/modules/messages/messages-list-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("searching by phone number renders one result", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Messages}]`).click()
  const phoneNumber = await app.client
    .$(`*[data-testid='message-row']`)
    .$("p")
    .getText()
  await app.client.$("input").setValue(phoneNumber)
  const rows = await app.client.$$(`*[data-testid=${MessagesListTestIds.Row}]`)
  expect(rows).toHaveLength(1)
  const resultsText = await app.client
    .$(`*[data-testid='message-row']`)
    .$("p")
    .getText()
  expect(resultsText).toBe(await app.client.$("input").getValue())
})
