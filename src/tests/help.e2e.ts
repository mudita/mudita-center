import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"

let app: any

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid=icon-Close]`).click()
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test("help takes user to correct location", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).click()
  app.client.windowHandles().then((handles: any) => {
    const helpWindow = handles.values[1]
    app.client.window(helpWindow)
    const hash = app.client.execute(() => window.location.hash)
    expect(hash.value).toEqual(`#${URL_MAIN.help}`)
  })
})

test("help link opens new window", async () => {
  const initialWindowCount = await app.client
    .waitUntilWindowLoaded()
    .getWindowCount()
  expect(initialWindowCount).toEqual(1)
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).click()
  const windowCountAfterHelpClick = await app.client
    .waitUntilWindowLoaded()
    .getWindowCount()
  expect(windowCountAfterHelpClick).toEqual(2)
})
