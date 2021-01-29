import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { name } from "../../package.json"
import fs from "fs"
let app: any

beforeEach(async () => {
  app = await startApp(true)
  const downloadPath =
    (await app.electron.remote.app.getPath("appData")) +
    `/${name}/pure/os/downloads/`
  if (fs.existsSync(downloadPath)) {
    fs.rmdirSync(downloadPath, { recursive: true })
  }
  await enablePhoneSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Overview}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test("should ", () => {
  console.log("test")
})
