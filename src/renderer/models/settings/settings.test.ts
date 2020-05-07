import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

test("loads settings", async () => {
  const store = init({
    models: { settings },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Get]: Promise.resolve({
      appAutostart: false,
      appTethering: false,
    }),
  }
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": false,
        "appTethering": false,
      },
    }
  `)
})

test("updates autostart key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.Autostart]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setAutostart(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": true,
      },
    }
  `)
})

test("updates tethering key in store", async () => {
  const store = init({
    models: { settings },
  })
  const updatedOption = { [Option.Tethering]: true }
  ;(ipcRenderer as any).__rendererCalls = {
    [SettingsEvents.Update]: Promise.resolve(updatedOption),
  }
  await store.dispatch.settings.setTethering(updatedOption)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appTethering": true,
      },
    }
  `)
})
