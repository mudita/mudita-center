import { startApp, stopApp } from "App/tests/hooks"
import { backendAdaptersChannel } from "Backend/backend.types"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("menu button takes user to correct page", async () => {
  await app.electron.ipcRenderer.invoke(backendAdaptersChannel)
  jest.setTimeout(100000)
  await app.client.debug()
})
