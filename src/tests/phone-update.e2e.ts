import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { name } from "../../package.json"
import fs from "fs"
import { SystemTestIds } from "Renderer/components/rest/overview/system/system-test-ids"
import translations from "Renderer/locales/default/en-US.json"

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

test("should ", async () => {
  await app.client.$(`*[data-testid=${SystemTestIds.DownloadButton}]`).click()
  console.log(
    translations["view.name.overview.system.modal.downloadCompleted.message"]
  )
})
