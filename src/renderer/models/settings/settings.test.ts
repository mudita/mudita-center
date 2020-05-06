import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

test("loadSettings updates state", async () => {
  const store = init({
    models: { settings },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Get]: Promise.resolve({
      autostart: ToggleState.Off,
      tethering: ToggleState.Off,
    }),
  }
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "autostart": 0,
        "tethering": 0,
      },
    }
  `)
})
